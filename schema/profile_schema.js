import Joi from "joi";

export const profileSchema = Joi.object({
    profilePicture: Joi.string().required(),
        location: Joi.string(),
        maritalStatus: Joi.array().string(),
        sex: Joi.string().enum(),
        bio: Joi.string(),
        about: Joi.string(),
        dateOfBirth: Joi.string().required(),
        contact: Joi.string().required(),
        language: Joi.array().string().required(),
        user: Joi.string().required(),
})