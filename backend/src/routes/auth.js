const router = require('express').Router();
const User = require('../models/UserModel');

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
    const user = new User({
        name: validation.value.name,
        email: validation.value.email,
        password: validation.value.password,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/test', async (req, res) => {
    res.send('test working ok...');
});

module.exports = router;
