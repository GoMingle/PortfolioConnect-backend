import { Education } from "../models/educationModel.js";
import { User } from "../models/user_model.js";
import { educationSchema } from "../schema/education_schema.js";

export const addEducation = async (req, res) => {

    try {
        const { error, value } = educationSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        //after, find the user with the id that you passed when creating the education 

        const userId = req.session?.user?.id || req?.user?.id

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        //create education with the value
        const education = await Education.create({ ...value, user: userId });
        //if you find the user, push the education id you just created inside
        user.education.push(education._id);

        //and save the user now with the educationId
        await user.save();

        //return the education
        res.status(201).json({ 
            message: 'Education added successfully',
            education: education 
          });

    } catch (error) {
        return res.status(500).send(error)
    }
}


export const getAllUserEducation = async (req, res, next) => {
    try {
        //we are fetching education that belongs to a particular user
        const userId = req.session?.user?.id || req?.user?.id
        const allEducation = await Education.find({ user: userId });
        // if (alleducation.length == 0) {
        //     return res.status(200).send({ education: alleducation })
        // }
        res.status(200).json({ education: allEducation })
    } catch (error) {
        next(error)
    }
}

export const getOneEducation = async (req, res, next) => {
    try {
        const oneEducation = await Education.findById(req.params.id)
        if (!oneEducation) {
          return res.status(200).send({ education: oneEducation });
        }
        res.status(200).json({ education: oneEducation })
    } catch (error) {
        next(error)
    }
  };


export const updateUserEducation = async (req, res) => {
    try {
        const { error, value } = educationSchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.session?.user?.id || req?.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const education = await Education.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!education) {
            return res.status(404).send("Education not found");
        }

        res.status(201).json({ 
            message: 'Education updated successfully',
            education: education 
          });
        
    } catch (error) {
        return res.status(500).json({ error })
    }
};


export const deleteUserEducation = async (req, res) => {
    try {
        const userId = req.session?.user?.id || req?.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const education = await Education.findByIdAndDelete(req.params.id);
        if (!education) {
            return res.status(404).send("Education not found");
        }

        user.education.pull(req.params.id);
        await user.save();
        res.status(201).json({ 
            message: 'Education deleted successfully'
          });
    } catch (error) {
        return res.status(500).json({ error })
    }
};