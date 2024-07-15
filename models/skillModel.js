import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const skillSchema = new Schema(
    
        {
        name: {type: String},
        levelOfProficiency: {type: String, enum: ['beginner', 'inter-mediate', 'advanced', 'expert']},
        user: {type: Types.ObjectId, ref: 'User'}
    }, {
        timestamps: true,
    }
);

skillSchema.plugin(toJSON);

export const Skills = model('Skills', skillSchema);