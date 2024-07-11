import bcrypt from 'bcrypt';
import { User } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";


export const signUp = async(req, res) => {
    const {error, value} = userSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const email = value.email
    console.log('email', email)

    const findIfUserExist = await User.findOne({email})
    if(findIfUserExist){
        return res.status(401).send('user has already signUp')
    } else{
        const hashedPassword = await bcrypt.hash(value.password, 12)
        value.password = hashedPassword
        const addUser = await User.create(value)
        return res.status(201).send(addUser)
    }



};