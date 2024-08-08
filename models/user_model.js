import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

 const userSchema = new Schema({
    
        firstName: {type: String},
        lastName: {type: String},
        otherName: {type: String},
        email: { type: String, lowercase: true, unique: true },
        password: { type: String },
        userName: { type: String, lowercase: true, unique: true },
        termsAndConditions: {type: String, enum:['Accept', 'Reject']},
        education: [{ type: Types.ObjectId, ref: 'Education' }],
        skills: [{ type: Types.ObjectId, ref: 'Skills' }],
        achievements: [{ type: Types.ObjectId, ref: 'Achievement' }],
        projects: [{ type: Types.ObjectId, ref: 'Project' }],
        userProfile: { type: Types.ObjectId, ref: 'Profile' },
        volunteering: [{ type: Types.ObjectId, ref: 'Volunteering' }],
        experiences: [{ type: Types.ObjectId, ref: 'Experience' }]
    
   
},{
        timestamps: true
});

userSchema.plugin(toJSON);

export const User = model('User', userSchema);
