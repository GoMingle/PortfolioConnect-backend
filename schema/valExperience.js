import joi from "joi";


export const experienceSchema = joi.object({
        companyName: joi.string().required(),
            role: joi.string(),
            responsibility: joi.string().required(),
            location: joi.string(),
            startDate: joi.string(),
            endDate: joi.string()
    
});

