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

const verifyAccountValidation = (reqBody) => {
    const schema = Joi.object({
        email: Joi.string().email().required().min(8),
        token: Joi.string().required(),
    });
    return schema.validate(reqBody);
};

const recoverPasswordValidation = (reqBody) => {
    const schema = Joi.object({
        email: Joi.string().email().required().min(8),
    });
    return schema.validate(reqBody);
};

const setNewPasswordValidation = (reqBody) => {
    const schema = Joi.object({
        email: Joi.string().email().required().min(8),
        password: Joi.string().min(8).required(),
        token: Joi.string().required(),
    });
    return schema.validate(reqBody);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.verifyAccountValidation = verifyAccountValidation;
module.exports.recoverPasswordValidation = recoverPasswordValidation;
module.exports.setNewPasswordValidation = setNewPasswordValidation;
