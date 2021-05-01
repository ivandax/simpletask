const Joi = require('joi');

const registerValidation = (reqBody) => {
    const schema = Joi.object({
        name: Joi.string().required().min(6),
        email: Joi.string().email().required().min(6),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(reqBody);    
}

module.exports.registerValidation = registerValidation;