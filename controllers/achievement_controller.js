import { Achievement } from "../models/achievementModel.js";
import { User } from "../models/user_model.js";
import { achievementSchema } from "../schema/achievement_schema.js";

export const addAchievement = async (req, res) => {

   try {
    const {error, value} = achievementSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    } 

    //after, find the user with the id that you passed when creating the achievement 
    const user = await User.findById(value.user);
    if (!user) {
      return res.status(404).send('User not found');
    }

    //create achievement with the value
    const achievement = await Achievement.create(value)
    //if you find the user, push the achievement id you just created inside
    user.achivement.push(achievement._id);
    
    //and save the user now with the achievementId
    await user.save();

    //return the achievment
    res.status(201).json({achievement})

   } catch (error) {
    return res.status(500).send(error)
   }
}


export const getAllUserAchievement = async (req, res) => {

    try {
        //we are fetching achievement that belongs to a particular user
        const userId = req.params.id
        const allachievement = await Achievement.find({user: userId})
    if(allachievement.length == 0){
        return res.status(404).send('No achievement added')
    }
    res.status(200).json({achievement:allachievement})
    } catch (error) {
        
    }

}

export const getOneAchievement = async (req, res) => {
    const achievement = await Achievement.findById(req.params.id)
    res.status(200).json(achievement)
}

export const patchAchievement = async (req, res, next) => {
    try {
        const updateAchievement = await Volunteering.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updateAchievement);
    } catch (error) {
        next(error)
    }
}

export const deleteOneAchievement = async (req, res) => {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    res.status(200).json(achievement);
}