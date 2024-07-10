import { Schema, model, Types } from "mongoose";

const volunteerSchema = new Schema(
    [
        {
            organization: {type: String},
            description: {type: String},
            skills: {type: String},
            responsibility: {type: String},
            skills: {type, String},
            startDate: {type: String},
            endDate: {type: String},
            user: {type: Types.ObjectId, ref: 'User'}  
        }
    ]
);

export const Volunteering = model('Volunteering', volunteerSchema);
 