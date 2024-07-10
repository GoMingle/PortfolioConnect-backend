import { Schema, model, Types } from "mongoose";

export const profileSchema = new Schema({
        profilePicture: {type: String},
        location: {type: String},
        maritalStatus: {type: String, enum: ['single', 'married', 'prefer-not-to-say']},
        sex: {type: String, enum: ['male', 'female']},
        bio: {type: String},
        about: {type: String},
        dateOfBirth: {type: String},
        contact: {type: String},
        language: [{type: String}],
        user: {type: Types.ObjectId, ref: 'User'}
    
});

export const profile = model('Profile', profileSchema);