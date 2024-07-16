import Joi from "joi";


export const achievementSchema = Joi.object({
    award: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string(),
    date: Joi.string(),
    nameOfInstitution: Joi.string(),
    user: Joi.string(),
    
});