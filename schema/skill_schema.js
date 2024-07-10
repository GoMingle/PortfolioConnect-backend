import Joi from "joi";

export const skillSchema = Joi.object({
    name: Joi.string().required(),
    levelOfProficiency: Joi.string().array().required(),
    user: Joi.string().required(),
});