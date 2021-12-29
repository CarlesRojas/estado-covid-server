const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const createUserValidation = (data) => {
    const schema = Joi.object({
        numberOfVaccines: Joi.number().min(0).max(3).required(),
    });

    return schema.validate(data);
};

const userIDValidation = (data) => {
    const schema = Joi.object({
        id: Joi.objectId().required(),
    });

    return schema.validate(data);
};

const updateVaccinesValidation = (data) => {
    const schema = Joi.object({
        id: Joi.objectId().required(),
        numberOfVaccines: Joi.number().min(0).max(3).required(),
    });

    return schema.validate(data);
};

const updateLocationValidation = (data) => {
    const schema = Joi.object({
        id: Joi.objectId().required(),
        provinceId: Joi.string().min(1).max(1024).required(),
        autonomicCommunityId: Joi.string().min(1).max(1024).required(),
    });

    return schema.validate(data);
};

const provinceValidation = (data) => {
    const schema = Joi.object({
        provinceId: Joi.string().min(1).max(1024).required(),
    });

    return schema.validate(data);
};

const autonomicCommuntyValidation = (data) => {
    const schema = Joi.object({
        autonomicCommunityId: Joi.string().min(1).max(1024).required(),
    });

    return schema.validate(data);
};

module.exports.createUserValidation = createUserValidation;
module.exports.userIDValidation = userIDValidation;
module.exports.updateVaccinesValidation = updateVaccinesValidation;
module.exports.updateLocationValidation = updateLocationValidation;
module.exports.provinceValidation = provinceValidation;
module.exports.autonomicCommuntyValidation = autonomicCommuntyValidation;
