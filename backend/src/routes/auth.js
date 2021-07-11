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
    setNewPasswordValidation,
    verifyAccountValidation,
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
    const emailExists = await User.findOne({ email: req.body.email }).catch((e) =>
        res.status(400).send(e)
    );
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
    console.log('registration - verification email sent');
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
    const savedUser = await User.findOne({ email: req.body.email }).catch((e) =>
        res.status(400).send(e)
    );
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
    const validation = verifyAccountValidation(req.body);
    if (validation.error !== undefined) {
        return res.status(400).send(stringError(validation.error.details[0].message));
    }
    const user = await User.findOne({ email: req.body.email }).catch((e) =>
        res.status(400).send(e)
    );
    console.log('verification - found user');
    if (!user) {
        return res.status(400).send(stringError('user not found'));
    }
    const verificationDoc = await EmailVerification.findOne({
        userId: user.id,
    }).catch((e) => res.status(400).send(e));
    if (!verificationDoc) {
        return res
            .status(400)
            .send(stringError('no verification doc exists for this user'));
    }
    if (req.body.token === verificationDoc.verificationToken) {
        console.log('verification - email match found');
        await User.updateOne({ _id: user._id }, { verified: true }).catch((e) =>
            res.status(400).send(e)
        );
        await verificationDoc.remove().catch((e) => res.status(400).send(e));
        res.send(successMessage);
    } else {
        return res.status(400).send(stringError('could not verify user'));
    }
});

router.post('/recover-password', async (req, res) => {
    const validation = recoverPasswordValidation(req.body);
    if (validation.error !== undefined) {
        return res.status(400).send(stringError(validation.error.details[0].message));
    }
    const user = await User.findOne({ email: req.body.email }).catch((e) =>
        res.status(400).send(e)
    );
    if (!user) {
        return res.status(400).send(stringError('user does not exist'));
    }
    console.log(`recover password - found user ${user._id}`);
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

router.post('/set-password', async (req, res) => {
    const validation = setNewPasswordValidation(req.body);
    if (validation.error !== undefined) {
        return res.status(400).send(stringError(validation.error.details[0].message));
    }
    const user = await User.findOne({ email: req.body.email }).catch((e) =>
        res.status(400).send(e)
    );
    console.log('password reset - found user');
    if (!user) {
        return res.status(400).send(stringError('password reset - user not found'));
    }
    const passwordRecoveryDoc = await PasswordRecovery.findOne({
        userId: user.id,
    }).catch((e) => res.status(400).send(e));
    console.log('password reset - found password recovery doc');
    if (!passwordRecoveryDoc) {
        return res
            .status(400)
            .send(stringError('no password recovery doc exists for this user'));
    }
    if (req.body.token === passwordRecoveryDoc.recoveryToken) {
        console.log('password reset - email match found');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await User.updateOne({ _id: user._id }, { password: hashedPassword }).catch((e) =>
            res.status(400).send(e)
        );
        await passwordRecoveryDoc.remove().catch((e) => res.status(400).send(e));
        res.send(successMessage);
        console.log('password reset - new password set successfully');
    } else {
        return res
            .status(400)
            .send(stringError('password recovery - could not reset password'));
    }
});

// ROUTES PROTECTED BY TOKEN

router.get('/validate-session', verify, async (req, res) => {
    console.log('validated session');
    res.send(successMessage);
});

router.get('/info', verify, async (req, res) => {
    console.log(`get user info - token data: ${req.user}`);
    const user = await User.findOne({ _id: req.user._id }).catch((e) =>
        res.status(400).send(e)
    );
    if (!user) {
        return res.status(400).send(stringError('get user failed'));
    }
    res.send({
        _id: user._id,
        verified: user.verified,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
});

module.exports = router;
