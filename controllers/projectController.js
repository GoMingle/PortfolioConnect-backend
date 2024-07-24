import { Project } from "../models/projectModel.js";
import { projectSchema } from "../schema/project_schema.js";
import { User } from "../models/user_model.js";
import { Profile } from "../models/profileModel.js";

export const addProject = async (req, res) => {

    try {
        const { error, value } = projectSchema.validate({
            ...req.body,
            image:req.file?.filename
        })
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const userId = req.session?.user?.id || req?.user?.id;
        // find the loggedIn User
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        //create project with the value
        const project = await Project.create({...value, user: userId});
        //if you find the user, push the project id you just created inside
        user.projects.push(project._id);

        //and save the user now with the projectId
        await user.save();

        //return the project
        res.status(201).json({ 
            message: 'Project added successfully',
            project: project 
          });

    } catch (error) {
        // console.log(error)
        return res.status(500).send(error)
    }
};


export const getAllUserProject = async (req, res, next) => {
    try {
        // get all project that belongs to a particular user
        const userId = req.session?.user?.id || req?.user?.id
        const allProject = await Project.find({ user: userId })
        // if (allProject.length == 0) {
        //     return res.status(200).send({ project: allProject })
        // }
        res.status(200).json({ project: allProject })
    } catch (error) {
        next(error)
    }

};

export const getOneProject = async (req, res, next) => {
    try {
        const oneProject = await Project.findById(req.params.id)
        if (!oneProject) {
          return res.status(200).send({ project: oneProject });
        }
        res.status(200).json({ project: oneProject })
    } catch (error) {
        next(error)
    }
  };


// Update Project
export const patchProject = async (req, res) => {
    try {
      const { error, value } = projectSchema.validate({...req.body, image:req.file?.filename});

  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user?.id; 
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await Project.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
      res.status(201).json({ 
        message: 'Project updated successfully',
        project: project 
      });
    } catch (error) {
      return res.status(500).json({error})
    }
  };

// Delete a Project
export const deleteOneProject = async (req, res, next) => {
    try {
        const deleteProject = await Project.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteProject);
        res.status(201).json({ 
            message: 'Project deleted successfully'
          });
    } catch (error) {
        next(error)
    }
};