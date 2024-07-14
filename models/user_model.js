import { Schema, model, Types } from "mongoose";

export const userSchema = new Schema({
    
        firstName: {type: String},
        lastName: {type: String},
        otherName: {type: String},
        email: { type: String, unique: true },
        password: { type: String },
        userName: { type: String },
        termsAndConditions: {type: String, enum:['Accept', 'Reject']},
        education: [{ type: Types.ObjectId, ref: 'Education' }],
        skills: [{ type: Types.ObjectId, ref: 'Skills' }],
        achievements: [{ type: Types.ObjectId, ref: 'Achievement' }],
        projects: [{ type: Types.ObjectId, ref: 'Project' }],
        userProfile: { type: Types.ObjectId, ref: 'UserProfile' },
        volunteering: [{ type: Types.ObjectId, ref: 'Volunteering' }],
        experiences: [{ type: Types.ObjectId, ref: 'Experience' }]
    
   
},{
        timestamps: true
});

export const User = model('User', userSchema);
