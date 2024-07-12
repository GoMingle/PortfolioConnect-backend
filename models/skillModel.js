import { Schema, model, Types } from "mongoose";

const skillSchema = new Schema(
    
        {
        name: {type: String},
        levelOfProficiency: {type: String, enum: ['beginner', 'inter-mediate', 'advanced', 'expert']},
        user: {type: Types.ObjectId, ref: 'User'}
    }
);

export const Skills = model('Skills', skillSchema);