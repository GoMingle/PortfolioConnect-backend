
import { Skills } from "../models/skillModel.js";
import { skillSchema } from "../schema/skill_schema.js";
import { User } from "../models/user_model.js";


export const createUserSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
   
    const user = await User.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skill = await Skills.create({ ...value, user: userSessionId });

    user.skills.push(skill._id)

    await user.save();

    res.status(201).json({ skill });
  } catch (error) {
    console.log(error);
  }
};



export const getAllUserSkills = async (req, res) => {
  try {
    // fetching Skill that belongs to a particular user
    const userSessionId = req.session.user.id
    const allSkill = await Skills.find({ user: userSessionId });
    if (allSkill.length == 0) {
      return res.status(404).send("No Skill added");
    }
    res.status(200).json({ Skills: allSkill });
  } catch (error) {
    return res.status(500).json({error})
  }
};



export const updateUserSkill = async (req, res) => {
    try {
      const { error, value } = skillSchema.validate(req.body);

  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userSessionId = req.session.user.id; 
      const user = await User.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const skill = await Skills.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!skill) {
            return res.status(404).send("Skill not found");
        }
  
      res.status(200).json({ skill });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const deleteUserSkill = async (req, res) => {
    try {
     
  
      const userSessionId = req.session.user.id; 
      const user = await User.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const skill = await Skills.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).send("Skill not found");
        }
  
        user.skills.pull(req.params.id);
        await user.save();
      res.status(200).json("Skill deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  