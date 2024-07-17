import Joi from "joi";

export const profileSchema = Joi.object({
    profilePicture: Joi.string().required(),
        location: Joi.string(),
        bio: Joi.string(),
        contact: Joi.string().required(),
        user: Joi.string(),
        githubLink: Joi.string(),
        linkedIn: Joi.string(),
        twitterLink: Joi.string()
        
})