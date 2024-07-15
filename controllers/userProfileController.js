import { Profile } from "../models/profileModel.js";
import { User } from "../models/user_model.js";
import { profileSchema } from "../schema/profile_schema.js";

export const createUserProfile = async (req, res) => {

    try {
        const { error, value } = profileSchema.validate({
            ...req.body,
            profilePicture: req.files.profilePicture[0].filename,
            resume: req.files.resume[0].filename,
        })
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session.user.id;


        const user = await User.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const profile = await Profile.create({ ...value, user: userSessionId });

        user.userProfile = profile._id;

        await user.save();

        res.status(201).json({ profile });
    } catch (error) {
        console.log(error);
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { error, value } = profileSchema.validate({
            ...req.body,
            profilePicture: req.files.profilePicture[0].filename,
            resume: req.files.resume[0].filename,
        });

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userSessionId = req.session.user.id;
        const user = await User.findById(userSessionId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const profile = await Profile.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(404).send("Profile not found");
        }

        res.status(201).json({ profile });
    } catch (error) {
        console.log(error);
    }
};

export const getUserProfile = async (req, res) => {
    try {

        const userSessionId = req.session.user.id
        const profile = await Profile.find({ user: userSessionId });
        if (!profile) {
            return res.status(404).send("No profile added");
        }
        res.status(200).json({ profile });
    } catch (error) {
        return res.status(500).json({ error })
    }
}
