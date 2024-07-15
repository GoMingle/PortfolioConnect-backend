import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

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
        githubLink: {type: String},
        linkedIn: {type: String},
        twitterLink: {type: String},
        user: {type: Types.ObjectId, ref: 'User'}
    
}, {
        timestamps: true,
    }
);

profileSchema.plugin(toJSON);

export const Profile = model('Profile', profileSchema);