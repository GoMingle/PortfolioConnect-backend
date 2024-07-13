import { Volunteering } from "../models/volunteeringModel.js";
import { User } from "../models/user_model.js";
import { volunteerSchema } from "../schema/volunteer_schema.js";

export const addVolunteering = async (req, res) => {
    try {
        const { error, value } = volunteerSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        //after, find the user with the id that you passed when creating volunteering 
        const user = await User.findById(value.user);
        if (!user) {
            return res.status(404).send('User not found');
        }

        //create volunteering with the value
        const volunteering = await Volunteering.create(value)
        //if you find the user, push the volunteering id you just created inside
        user.volunteering.push(volunteering._id);

        //and save the user now with the volunteringId
        await user.save();

        //return the volunteering
        res.status(201).json({ volunteering })

    } catch (error) {
        return res.status(500).send(error)
    }
}

export const getAllUserVolunteering = async (req, res, next) => {
    try {
        //we are fetching volunteering that belongs to a particular user
        const userId = req.params.id
        const allvolunteering = await Volunteering.find({ user: userId })
        if (alleducation.length == 0) {
            return res.status(404).send('No volunteering added')
        }
        res.status(200).json({ volunteering: allvolunteering })
    } catch (error) {
        next(error);
    }
}

export const getOneVolunteering = async (req, res, next) => {
    try {
        const volunteering = await Volunteering.findById(req.params.id)
        res.status(200).json(volunteering)
    } catch (error) {
        next(error)
    }
}

export const patchVolunteering = async (req, res, next) => {
    try {
        const updateVolunteering = await Volunteering.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updateVolunteering);
    } catch (error) {
        next(error)
    }
}

export const deleteOneVolunteering = async (req, res, next) => {
    try {
        const volunteering = await Volunteering.findByIdAndDelete(req.params.id);
        res.status(200).json(volunteering);
    } catch (error) {
        next(error);
    }
}