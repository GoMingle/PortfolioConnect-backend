import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import expressOasGenerator from "express-oas-generator";
import { dbconnection } from "./config/db.js";
import { userRouter } from "./routes/user_route.js";



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
app.use('/api/v1', userRouter)

// Use routes
// app.use();
// API DOCS
expressOasGenerator.handleRequests();
app.use((req,res) => res.redirect('/api-docs/'));


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
