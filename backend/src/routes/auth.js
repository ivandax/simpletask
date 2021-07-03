const router = require('express').Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const EmailVerification = require('../models/EmailVerification');

const { registerValidation, loginValidation } = require('./authValidation');
const { getVerificationEmail, getNodemailerOptions } = require('./nodemailer');

router.post('/register', async (req, res) => {
    const validation = registerValidation(req.body);
    if (validation.error !== undefined) {
        return res.status(400).send(validation.error.details[0].message);
    }
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send('Email already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        companyName: validation.value.companyName,
        name: validation.value.name,
        email: validation.value.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        console.log('created user' + savedUser._id);
        try {
            const emailSalt = await bcrypt.genSalt(10);
            const hashedEmail = await bcrypt.hash(savedUser.email, emailSalt);
            const smtpTransport = nodemailer.createTransport(
                getNodemailerOptions(
                    process.env.EMAIL_HOST,
                    process.env.EMAIL_USER,
                    process.env.EMAIL_PASSWORD
                )
            );
            try {
                await smtpTransport.sendMail(
                    getVerificationEmail(
                        process.env.EMAIL_USER,
                        savedUser.email,
                        hashedEmail
                    )
                );
                console.log('verification email sent');
                const emailVerificationDoc = new EmailVerification({
                    verificationToken: hashedEmail,
                    userId: savedUser._id,
                });
                const savedEmailVerificationDoc = await emailVerificationDoc.save();
                res.send({
                    user: savedUser._id,
                    verificationDoc: savedEmailVerificationDoc._id,
                });
            } catch (e) {
                res.status(400).send(e);
            }
        } catch (e) {
            res.status(400).send(e);
        }
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/login', async (req, res) => {
    const validation = loginValidation(req.body);
    if (validation.error !== undefined) {
        return res.status(400).send(validation.error.details[0].message);
    }
    //check if email already exists in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email or password is wrong');
    }
    //check password validity
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send('Invalid password');
    }

    //create and assing a json web token for session
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 60,
    });
    res.header('auth-token', token).send(token);
});

router.post('/test', async (req, res) => {
    res.send('test working ok...');
});

module.exports = router;
