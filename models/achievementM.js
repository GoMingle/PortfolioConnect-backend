import { Schema, model, Types } from "mongoose";

const acheivementSchema = new Schema(
     
        {
            award: {type: String},
            description: {type: String},
            image: {type: String},
            date: {type: String},
            nameOfInstitution: {type: String},
            user: {type: Types.ObjectId, ref: 'User'}
        }
    
);

export const Achievement = model('Achievement', acheivementSchema);