import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import expressOasGenerator from "express-oas-generator";
import { dbconnection } from "./config/db.js";
import { userRouter } from "./routes/user_route.js";
import educationRouter from "./routes/education_route.js";
import achievementRouter from "./routes/achievement_route.js";
import userProfileRouter from "./routes/userProfile_route.js";
import volunteeringRouter from "./routes/volunteering_route.js";


// Connect to express app
const app = express();
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    mongooseModels: mongoose.modelNames(),
});

// Database connection
dbconnection();

app.use(express.json());
app.use(cors());
app.use('/api/v1', userRouter);
app.use(educationRouter);
app.use(achievementRouter);
app.use(userProfileRouter);
app.use(volunteeringRouter);


// Use routes
// app.use();
// API DOCS
expressOasGenerator.handleRequests();
app.use((req,res) => res.redirect('/api-docs/'));


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
