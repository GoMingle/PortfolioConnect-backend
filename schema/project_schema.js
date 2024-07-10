import Joi from "joi";

export const projectSchema = Joi.object({
    projectName: Joi.string().required(),
    description: Joi.string().required(),
    contributors: Joi.string(),
    skills: Joi.string(),
    nameOfInstitution: Joi.string().required(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    user: Joi.string().required(),
});