import { Volunteering } from "../models/volunteeringModel.js";
import { User } from "../models/user_model.js";
import { volunteerSchema } from "../schema/volunteer_schema.js";

export const createUserVolunteering = async (req, res) => {
    try {
        const { error, value } = volunteerSchema.validate(req.body);
    
        if (error) {
          return res.status(400).send(error.details[0].message);
        }
    
        const userId = req.session?.user?.id || req?.user?.id;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        const volunteering = await Volunteering.create({
          ...value,
          user: userId,
        });
    
        user.volunteering.push(volunteering._id);
    
        await user.save();
    
        res.status(201).json({ 
          message: 'Volunteering created successfully',
          volunteering: volunteering 
        });
      } catch (error) {
        return res.status(500).send(error)
      }
}

export const getAllUserVolunteering = async (req, res) => {
    try {
        //we are fetching Volunteering that belongs to a particular user
        const userId = req.session?.user?.id || req?.user?.id;
        const allVolunteering = await Volunteering.find({ user: userId });
        // if (allVolunteering.length == 0) {
        //   return res.status(200).send({ Volunteerings: allVolunteering });
        // }
        res.status(200).json({ Volunteerings: allVolunteering });
      } catch (error) {
        return res.status(500).json({ error });
      }
}

export const getOneVolunteering = async (req, res, next) => {
  try {
      const oneVolunteering = await Volunteering.findById(req.params.id)
      if (!oneVolunteering) {
        return res.status(200).send({ volunteering: oneVolunteering });
      }
      res.status(200).json({ volunteering: oneVolunteering })
  } catch (error) {
      next(error)
  }
};


export const updateUserVolunteering = async (req, res) => {
    try {
      const { error, value } = volunteerSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user?.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const volunteering = await Volunteering.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true }
      );
      if (!volunteering) {
        return res.status(404).send("Volunteering not found");
      }
  
      return res.status(201).json({ 
        message: 'Volunteering updated successfully',
        volunteering: volunteering 
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
  

  export const deleteUserVolunteering = async (req, res) => {
    try {
      const userId = req.session?.user?.id || req?.user?.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const volunteering = await Volunteering.findByIdAndDelete(req.params.id);
      if (!volunteering) {
        return res.status(404).send("Volunteering not found");
      }
  
      user.volunteering.pull(req.params.id);
      await user.save();
  
      return res.status(201).json({ 
        message: 'Volunteering deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
  