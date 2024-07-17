import Joi from "joi";

export const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    otherName: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    userName: Joi.string().required(),
    termsAndConditions: Joi.boolean().optional(),
});

export const loginValidator = Joi.object({
    userName: Joi.string().alphanum(),
    email: Joi.string().email(),
    password: Joi.string().required(),
});

