import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js"; // to import login and signup routes
import trainerRouter from "./routes/trainer.js"; // to import login and signup routes
import studentRouter from "./routes/student.js"; // to import login and signup routes
import courseRouter from "./routes/course.js"
import usersRouter from "./routes/users.js";
import branchRouter from "./routes/branch.js";
import subcourseRouter from "./routes/subcourse.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { createError } from "./utils/error.js";

const app = express();


app.use(cors());
app.use(morgan("common"))
app.use(cookieParser());
app.use(express.json())// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json());

dotenv.config()

const connect = async (next) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to database');
    } catch (error) {
        const { status, message } = error;
        throw createError(error || 500, message || 'Database connection error');
    }
}

mongoose.connection.on('connected', err => {
    console.log('connected');
});
mongoose.connection.on('disconnected', err => {
    console.log('disconnected...');
});



// middlewares
app.use("/api/auth", authRouter); // to login and signup admin and trainer
app.use("/api/trainer", trainerRouter); // to login and signup admin and trainer
app.use("/api/student", studentRouter); // to login and signup admin and trainer
// app.use("/api/users", usersRouter);


app.use("/api/course", courseRouter); //to create course
app.use("/api/subcourse", subcourseRouter); //to create course
// app.use("/api/hotels", hotelsRouter);
app.use("/api/branch", branchRouter); // to create branch


app.use((error, req, res, next) => {
    console.log(error, 'error');
    const errorStatus = error.status || 500;
    const errorMessage = error.message || 'something went wrong!';
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack,

    });
})


app.listen(process.env.PORT, () => {
    connect()
    console.log(`Server running... ${process.env.PORT} `);
})

