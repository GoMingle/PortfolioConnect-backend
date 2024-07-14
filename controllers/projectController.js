import { Project } from "../models/projectModel.js";
import { projectSchema } from "../schema/project_schema.js";
import { User } from "../models/user_model.js";

export const addProject = async (req, res) => {

    try {
        const { error, value } = projectSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        // find the loggedIn User
        const user = await User.findById(value.user);
        if (!user) {
            return res.status(404).send('User not found');
        }

        //create project with the value
        const project = await Project.create(value)
        //if you find the user, push the project id you just created inside
        user.project.push(project._id);

        //and save the user now with the projectId
        await user.save();

        //return the project
        res.status(201).json({ project })

    } catch (error) {
        return res.status(500).send(error)
    }
};


export const getAllUserProject = async (req, res, next) => {

    try {
        // get all project that belongs to a particular user
        const userId = req.params.id
        const allProject = await Project.find({ user: userId })
        if (allProject.length == 0) {
            return res.status(404).send('No project added')
        }
        res.status(200).json({ project: allProject })
    } catch (error) {
        next(error)
    }

};

export const getOneProject = async (req, res, next) => {
    try {
        const oneProject = await Project.findById(req.params.id)
        res.status(200).json(oneProject)
    } catch (error) {
        next(error)
    }
};

export const patchProject = async (req, res, next) => {
    try {
        const updateProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updateProject);
    } catch (error) {
        next(error)
    }
};

// Delete a Project
export const deleteOneProject = async (req, res, next) => {
    try {
        const deleteProject = await Project.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteProject);
    } catch (error) {
        next(error)

    }
};