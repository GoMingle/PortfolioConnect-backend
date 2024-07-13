import Joi from "joi";

export const profileSchema = Joi.object({
    profilePicture: Joi.string().required(),
        location: Joi.string(),
        maritalStatus: Joi.string(),
        sex: Joi.string().valid('Male', 'Female', 'Other'),
        bio: Joi.string(),
        about: Joi.string(),
        dateOfBirth: Joi.string().required(),
        contact: Joi.string().required(),
        language: Joi.array().items(Joi.string()).required(),
        user: Joi.string().required(),
})