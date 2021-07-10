const router = require('express').Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// models
const User = require('../models/UserModel');
const EmailVerification = require('../models/EmailVerification');
const PasswordRecovery = require('../models/PasswordRecovery');

//helpers
const {
    registerValidation,
    loginValidation,
    recoverPasswordValidation,
} = require('./authValidation');
const {
    getVerificationEmail,
    getNodemailerOptions,
    getPasswordRecoveryEmail,
} = require('./nodemailer');

const { stringError } = require('./helpers');

// session validation
const verify = require('./verifyToken');

// eslint-disable-next-line no-undef
const env = process.env;

// vars
const successMessage = { success: true };

router.post('/register', async (req, res) => {
    const validation = registerValidation(req.body);
    if (validation.error !== undefined) {
        return res.status(400).send(stringError(validation.error.details[0].message));
    }
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send(stringError('user already exists'));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: validation.value.name,
        email: validation.value.email,
        password: hashedPassword,
    });
    const savedUser = await user.save().catch((e) => res.status(400).send(e));
    console.log(`registration - created user ${savedUser._id}`);
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
    console.log('regsitration - verification email sent');
    const emailVerificationDoc = new EmailVerification({
        verificationToken: emailToken,
        userId: savedUser._id,
    });
    await emailVerificationDoc.save().catch((e) => res.status(400).send(e));
    res.send(successMessage);
});

router.post('/login', async (req, res) => {
    const validation = loginValidation(req.body);
    if (validation.error !== undefined) {
        return res.status(400).send(stringError(validation.error.details[0].message));
    }
    //check if email already exists in the database
    const savedUser = await User.findOne({ email: req.body.email });
    if (!savedUser) {
        return res.status(400).send(stringError('email is wrong'));
    }
    //check password validity
    const validPass = await bcrypt.compare(req.body.password, savedUser.password);
    if (!validPass) {
        return res.status(400).send(stringError('invalid password'));
    }

    //create and assign a json web token for session
    // { expiresIn: 60 * 5 }
    const token = jwt.sign({ _id: savedUser._id }, env.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 8,
    });
    console.log('login - token generated');
    res.header('auth-token', token).send({
        token,
    });
});

router.post('/verify', async (req, res) => {
    const email = req.body.email;
    const emailToken = req.body.token;
    const user = await User.findOne({ email: req.body.email });
    console.log(email, emailToken);
    console.log('verification - found user');
    if (!user) {
        return res.status(400).send(stringError('user not found'));
    }
    const verificationDoc = await EmailVerification.findOne({ userId: user.id });
    if (!verificationDoc) {
        return res
            .status(400)
            .send(stringError('no verification doc exists for this user'));
    }
    if (emailToken === verificationDoc.verificationToken) {
        console.log('verification - email match found');
        await user.update({ verified: true }).catch((e) => res.status(400).send(e));
        await verificationDoc.remove().catch((e) => res.status(400).send(e));
        res.send(successMessage);
    } else {
        return res.status(400).send(stringError('could not verify user'));
    }
});

// this fails if session is not valid
router.get('/validate-session', verify, async (req, res) => {
    console.log('validated session');
    res.send(successMessage);
});

router.post('/recover-password', async (req, res) => {
    const validation = recoverPasswordValidation(req.body);
    if (validation.error !== undefined) {
        return res.status(400).send(stringError(validation.error.details[0].message));
    }
    const user = await User.findOne({ email: req.body.email });
    console.log(`recover password - found user ${user._id}`);
    if (!user) {
        return res.status(400).send(stringError('user does not exist'));
    }
    const recoveryToken = jwt.sign(
        { email: validation.value.email, random: Math.random() * 100 },
        env.PASSWORD_RECOVERY_SECRET
    );
    const smtpTransport = nodemailer.createTransport(
        getNodemailerOptions(env.EMAIL_HOST, env.EMAIL_USER, env.EMAIL_PASSWORD)
    );
    await smtpTransport
        .sendMail(getPasswordRecoveryEmail(env.EMAIL_USER, user.email, recoveryToken))
        .catch((e) => res.status(400).send(e));
    console.log('recover password - password recovery email sent');
    const passwordRecoveryDoc = new PasswordRecovery({
        recoveryToken,
        userId: user._id,
    });
    await passwordRecoveryDoc
        .save()
        .catch(() =>
            res.status(400).send(stringError(`recover password - db insertion problem`))
        );
    res.send(successMessage);
});

module.exports = router;
