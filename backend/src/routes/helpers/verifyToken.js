const jwt = require('jsonwebtoken');
const InvalidToken = require('../../models/InvalidToken');

const { stringError } = require('./helpers');

// eslint-disable-next-line no-undef
const env = process.env;

module.exports = async function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send(stringError('access denied'));
    }
    try {
        const verifiedToken = jwt.verify(token, env.TOKEN_SECRET);
        console.log('verified token', verifiedToken);
        const foundInvalidToken = await InvalidToken.findOne({
            userId: verifiedToken._id,
        }).catch((e) => res.status(400).send(e));
        if (foundInvalidToken === null) {
            req.user = verifiedToken;
            next();
        } else if (foundInvalidToken.invalidToken === token) {
            res.status(401).send(stringError('invalid token provided'));
        } else {
            await foundInvalidToken.remove().catch((e) => res.status(400).send(e));
            console.log('cleaned up invalid tokens');
            req.user = verifiedToken;
            next();
        }
    } catch (err) {
        res.status(400).send(stringError('invalid token'));
    }
};
