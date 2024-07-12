import bcrypt from 'bcrypt';
import { userModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";


export const signUp = async(req, res, next) => {
   try {
    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const email = value.email
    console.log('email', email)

    const findIfUserExist = await userModel.findOne({email})
    if(findIfUserExist){
        return res.status(401).send('user has already signUp')
    } else{
        const hashedPassword = await bcrypt.hash(value.password, 12)
        value.password = hashedPassword;
        delete value.confirmPassword; // Remove confirmPassword field before storing
        const addUser = await userModel.create(value)
        return res.status(201).send(addUser)
    }
   } catch (error) {
    next(error)
    
   }



};