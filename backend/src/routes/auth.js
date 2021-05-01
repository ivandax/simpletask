const router = require('express').Router();
var bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('./authValidation');

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
        name: validation.value.name,
        email: validation.value.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (err) {
        res.status(400).send(err);
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
