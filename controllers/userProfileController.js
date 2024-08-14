import { Profile } from "../models/profileModel.js";
import { User } from "../models/user_model.js";
import { profileSchema } from "../schema/profile_schema.js";

export const createUserProfile = async (req, res) => {
    try {
        const { error, value } = profileSchema.validate({
            ...req.body,
            profilePicture: req.files?.profilePicture[0].filename,
            resume: req.files?.resume[0].filename,
        })
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Get user id from session or request
        const userId = req.session?.user?.id || req?.user?.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Check if user profile exit
        if (user.userProfile) {
            return res.status(404).send("Sorry, There can be only one instance of USER PROFILE");
        }

        const profile = await Profile.create({ ...value, user: userId });

        user.userProfile = profile._id;

        await user.save();
         
        return res.status(201).json({ 
            message: 'Profile created successfully',
            profile: profile 
          });


    } catch (error) {
        return res.status(500).send(error)
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { error, value } = profileSchema.validate({
            ...req.body,
            profilePicture: req.files?.profilePicture[0].filename,
            resume: req.files?.resume[0].filename,
        });

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.session?.user?.id || req?.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const profile = await Profile.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(404).send("Profile not found");
        }

        return res.status(201).json({ 
            message: 'Profile updated successfully',
            profile: profile 
          });
    } catch (error) {
        return res.status(500).send(error)
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.session?.user?.id || req?.user?.id;
        const profile = await Profile.findOne({ user: userId }).populate({
            path: 'user',
            select: '-password'
        });
        if (!profile) {
            return res.status(404).send("No profile added");
        }
        res.status(200).json({ profile });
    } catch (error) {
        return res.status(500).json({ error })
    }
}
