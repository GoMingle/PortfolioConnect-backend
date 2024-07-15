import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import { dbconnection } from "./config/db.js";
import { userRouter } from "./routes/user_route.js";
import { experienceRouter } from "./routes/experience_route.js";
import { skillRouter } from "./routes/skills.js";
import educationRouter from "./routes/education_route.js";
import achievementRouter from "./routes/achievement_route.js";
import userProfileRouter from "./routes/userProfile_route.js";
import volunteeringRouter from "./routes/volunteering_route.js";
import projectRouter from "./routes/project_route.js";


// Connect to express app
const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth','Profile', 'Skills', 'Project', 'Volunteering', 'Experience', 'Education', 'Achievement'],
    mongooseModels: mongoose.modelNames(),
});

// Database connection
dbconnection();

// Middlewares
app.use(express.json());
app.use(cors());
// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));

// Use routes
app.use('/api/v1', userRouter);
app.use('/api/v1', experienceRouter);
app.use('/api/v1', educationRouter);
app.use('/api/v1', achievementRouter);
app.use('/api/v1', userProfileRouter);
app.use('/api/v1', volunteeringRouter);
app.use('/api/v1', projectRouter);
app.use('/api/v1', skillRouter);


// Applying swagger documentation
expressOasGenerator.handleRequests(app, {
    alwaysServeDocs: true,
});
app.use((req, res) => res.redirect('/api-docs/'));



// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
