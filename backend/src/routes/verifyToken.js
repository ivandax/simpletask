const jwt = require('jsonwebtoken');

const { stringError } = require('./helpers');

// eslint-disable-next-line no-undef
const env = process.env;

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send(stringError('Access denied'));
    }
    try {
        //verified is the payload of the jwt
        const verified = jwt.verify(token, env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send(stringError('Invalid token'));
    }
};
