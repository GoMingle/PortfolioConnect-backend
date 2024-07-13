import { Profile} from "../models/profileModel.js";
import { User } from "../models/user_model.js";
import { profileSchema } from "../schema/profile_schema.js";

export const addProfile = async (req, res) => {

    try {
        const { error, value } = profileSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        //after, find the user with the id that you passed when creating the Profile 
        const user = await User.findById(value.user);
        if (!user) {
            return res.status(404).send('User not found');
        }

        //create Profile with the value
        const profile = await Profile.create(value);
        //if you find the user, push the profile id you just created inside
        user.profile.push(profile._id); //Might change to assign

        //and save the user now with the ProfileId
        await user.save();

        //return the profile
        res.status(201).json({ profile })

    } catch (error) {
        return res.status(500).send(error)
    }
}



export const getAllUserProfile = async (req, res, next) => {

    try {
        //we are fetching profile that belongs to a particular user
        const userId = req.params.id
        const allUserProfile = await Profile.find({ user: userId })
        if (allUserProfile.length == 0) {
            return res.status(404).send('No profile added')
        }
        res.status(200).json({ profile: allUserProfile })
    } catch (error) {
        next(error)
    }

}

export const getOneProfile = async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    res.status(200).json(profile)
}


export const deleteOneProfile = async (req, res) => {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json(profile);
}