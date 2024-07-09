import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user: {
        firstName: {type: String},
        lastName: {type: String},
        otherName: {type: String},
        email: { type: String, unique: true },
        password: { type: String },
        userName: { type: String, required: true },
        termsAndConditions: {type: Boolean},
    },
   


    userProfile: {
        profilePicture: {type: String},
        location: {type: String},
        maritalStatus: {type: String, enum: ['single', 'married', 'prefer-not-to-say']},
        sex: {type: String, enum: ['male', 'female']},
        bio: {type: String},
        about: {type: String},
        dateOfBirth: {type: String},
        contact: {type: String},
        language: [{type: String}]
    },

    solials: {
        githubLink: {type: String},
        linkedIn: {type: String},
        twitterLink: {type: String},
    },

    skills: 
        [
            {
            name: {type: String},
            levelOfProficiency: {type: String, enum: ['beginner', 'inter-mediate', 'advanced', 'expert']},
        }
    ],

    experince: [
        {
            companyName: {type: String},
            role: {type: String},
            responsibility: {type: String},
            location: {type: String},
            startDate: {type: String},
            endDate: {type: String}
        }
    ],
    
    education: [
        {
            schoolName: {type: String},
            program: {type: String},
            qualification: {type: String},
            grade: {type: String},
            location: {type: String},
            startDate: {type: String},
            endDate: {type: String}
        }
    ],

    achievements: [
        {
            Award: {type: String},
            description: {type: String},
            image: {type: String},
            date: {type: String},
            nameOfInstitution: {type: String},
        }
    ],

    projects: [
        {
            projectName: {type: String},
            description: {type: String},
            contributors: {type: String},
            skills: {type, String},
            nameOfInstitution: {type: String},
            startDate: {type: String},
            endDate: {type: String}

            
        }
    ],

    volunteering: [
        {
            organization: {type: String},
            description: {type: String},
            skills: {type: String},
            responsibility: {type: String},
            skills: {type, String},
            startDate: {type: String},
            endDate: {type: String}  
        }
    ],
    
});

export const user = model('user', userSchema);
