import Joi from "joi";

export const volunteerSchema = Joi.object({
    organization: Joi.string().required(),
    description: Joi.string(),
    skills: Joi.string().required(),
    responsibility: Joi.string().required(),
    skills: Joi.string().required(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    user: Joi.string(),
});