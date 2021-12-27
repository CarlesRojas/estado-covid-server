const Joi = require("joi");

const createUserValidation = (data) => {
    const schema = Joi.object({
        numberOfVaccines: Joi.number().min(0).max(3).required(),
    });

    return schema.validate(data);
};

module.exports.createUserValidation = createUserValidation;
