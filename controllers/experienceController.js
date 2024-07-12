import { Experience } from "../models/experienceModel.js";
import { experienceSchema } from "../schema/experience_schema.js";
import { UserModel } from "../models/user_model.js";

export const addExperience = async (req, res, next) => {
    try {
        const { error, value } = experienceSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    // find specific user
    const user = await UserModel.findById(value.user);
    if (!user) {
        return res.status(404).send('User not found');
    }
    //create experience with the value
    const experience = await Experience.create(value)
    
    // user found push experience id inside
    user.experience.push(experience._id);
    
    //  user save now with experience.Id
    await user.save();

    //return the experience
    res.status(201).json({experience})
    } catch (error) {
        next(error)
        
    }
};