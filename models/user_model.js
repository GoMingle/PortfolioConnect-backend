import { Schema, model, Types } from "mongoose";

export const userSchema = new Schema({
    
        firstName: {type: String},
        lastName: {type: String},
        otherName: {type: String},
        email: { type: String, unique: true },
        password: { type: String },
        userName: { type: String, required: true },
        termsAndConditions: {type: Boolean},
        githubLink: {type: String},
        linkedIn: {type: String},
        twitterLink: {type: String},
   
});

export const User = model('User', userSchema);
