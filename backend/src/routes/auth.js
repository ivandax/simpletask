const router = require('express').Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// models
const User = require('../models/UserModel');
const EmailVerification = require('../models/EmailVerification');

//helpers
const { registerValidation, loginValidation } = require('./authValidation');
const { getVerificationEmail, getNodemailerOptions } = require('./nodemailer');
const { stringError } = require('./helpers');

// eslint-disable-next-line no-undef
const env = process.env;

router.post('/register', async (req, res) => {
    const validation = registerValidation(req.body);
    if (validation.error !== undefined) {
        return res.status(400).send(stringError(validation.error.details[0].message));
    }
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send(stringError('User already exists'));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: validation.value.name,
        email: validation.value.email,
        password: hashedPassword,
    });
    const savedUser = await user.save().catch((e) => res.status(400).send(e));
    console.log(`Created User ${savedUser._id}`);
    const emailToken = jwt.sign(
        { email: validation.value.email, random: Math.random() * 100 },
        env.EMAIL_TOKEN_SECRET
    );
    const smtpTransport = nodemailer.createTransport(
        getNodemailerOptions(env.EMAIL_HOST, env.EMAIL_USER, env.EMAIL_PASSWORD)
    );
    await smtpTransport
        .sendMail(getVerificationEmail(env.EMAIL_USER, savedUser.email, emailToken))
        .catch((e) => res.status(400).send(e));
    console.log('verification email sent');
    const emailVerificationDoc = new EmailVerification({
        verificationToken: emailToken,
        userId: savedUser._id,
    });
    await emailVerificationDoc.save().catch((e) => res.status(400).send(e));
    res.send({ success: true });
});

router.post('/login', async (req, res) => {
    const validation = loginValidation(req.body);
    if (validation.error !== undefined) {
        return res.status(400).send(validation.error.details[0].message);
    }
    //check if email already exists in the database
    const savedUser = await User.findOne({ email: req.body.email });
    if (!savedUser) {
        return res.status(400).send('Email or password is wrong');
    }
    //check password validity
    const validPass = await bcrypt.compare(req.body.password, savedUser.password);
    if (!validPass) {
        return res.status(400).send('Invalid password');
    }

    //create and assing a json web token for session
    const token = jwt.sign({ _id: savedUser._id }, env.TOKEN_SECRET, {
        expiresIn: 60,
    });
    res.header('auth-token', token).send({
        user: {
            verified: savedUser.verified,
            _id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
        },
        token,
    });
});

router.post('/verify', async (req, res) => {
    const email = req.body.email;
    const emailToken = req.body.token;
    const user = await User.findOne({ email: req.body.email });
    console.log(email, emailToken);
    console.log(`Found user ${user}`);
    if (!user) {
        return res.status(400).send('User not found');
    }
    const validationDoc = await EmailVerification.findOne({ userId: user.id });
    if (!validationDoc) {
        return res.status(400).send('No validation doc exists for this user');
    }
    if (emailToken === validationDoc.verificationToken) {
        console.log('Email verification match found!');
        await user.update({ verified: true }).catch((e) => res.status(400).send(e));
        const updatedUser = await User.findById(user._id).catch((e) =>
            res.status(400).send(e)
        );
        res.send({
            mesage: 'email verified',
            user: updatedUser,
        });
    } else {
        return res.status(400).send('Could not verify user');
    }
});

router.post('/test', async (req, res) => {
    res.send('test working ok...');
});

module.exports = router;
