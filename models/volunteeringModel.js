import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const volunteerSchema = new Schema(
    
        {
            organization: {type: String},
            description: {type: String},
            skills: {type: String},
            responsibility: {type: String},
            startDate: {type: String},
            endDate: {type: String},
            user: {type: Types.ObjectId, ref: 'User'}  
        }, {
            timestamps: true,
        }
    
);

volunteerSchema.plugin(toJSON);

export const Volunteering = model('Volunteering', volunteerSchema);
 