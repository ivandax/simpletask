const router = require('express').Router();
const User = require('../models/UserModel');

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
