import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

export const profileSchema = new Schema({
        profilePicture: {type: String},
        location: {type: String},
        bio: {type: String},
        contact: {type: String},
        resume: {type: String},
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