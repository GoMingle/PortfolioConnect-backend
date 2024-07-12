import bcrypt from 'bcrypt';
import { UserModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";


export const signUp = async(req, res, next) => {
   try {
    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const email = value.email
    console.log('email', email)

    const findIfUserExist = await UserModel.findOne({email})
    if(findIfUserExist){
        return res.status(401).send('user has already signUp')
    } else{
        const hashedPassword = await bcrypt.hash(value.password, 12)
        value.password = hashedPassword;
        delete value.confirmPassword; // Remove confirmPassword field before storing
        const addUser = await UserModel.create(value)
        return res.status(201).send(addUser)
    }
   } catch (error) {
    next(error)
    
   }



};

export const login = async (req, res, next) => {
    try {
    //   const { error, value } = userSchema.validate(req.body);
    //   if (error) {
    //     return res.status(400).send(error.details[0].message);
    //   }
  
      const { email, userName, password } = req.body;
  
      // Find user by email, username, or phone
      const user = await UserModel.findOne({
        $or: [
          { email: email },
          { userName: userName }
          
        ]
      });
  
      if (!user) {
        return res.status(401).json('No user found');
      }
  
      // Verify the password
      const correctPassword =  bcrypt.compareSync(password, user.password);
      if (!correctPassword) {
        return res.status(401).json('Invalid credentials');
      }
  
      // Generate a session
      req.session.user = { id: user.id };
  
      // Return response
      res.status(200).json('Login successful');
    } catch (error) {
      next(error);
    }
  };

  