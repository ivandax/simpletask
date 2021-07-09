const Joi = require('joi');

const registerValidation = (reqBody) => {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email().required().min(8),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(reqBody);
};

const loginValidation = (reqBody) => {
    const schema = Joi.object({
        email: Joi.string().email().required().min(8),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(reqBody);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
