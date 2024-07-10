import Joi from "joi";

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    otherName: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    userName: Joi.string().optional(),
    termsAndConditions: Joi.boolean().required(),
});
