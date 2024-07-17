import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const educationSchema = new Schema(
    
        {
            schoolName: { type: String },
            program: { type: String },
            qualification: { type: String },
            location: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            user: {type: Types.ObjectId, ref: 'User'}
        }, {
            timestamps: true,
        }
    
);

educationSchema.plugin(toJSON);

export const Education = model('Education', educationSchema);