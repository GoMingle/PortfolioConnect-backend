import { Schema, model, Types } from "mongoose";

export const userSchema = new Schema({
    
        firstName: {type: String},
        lastName: {type: String},
        otherName: {type: String},
        email: { type: String, unique: true },
        password: { type: String },
        userName: { type: String },
        termsAndConditions: {type: String, enum:['Accept', 'Reject']},
        githubLink: {type: String},
        linkedIn: {type: String},
        twitterLink: {type: String},
   
},{
        timestamps: true
});

export const userModel = model('User', userSchema);
