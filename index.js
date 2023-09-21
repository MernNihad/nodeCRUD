import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";

const app = express();

app.use(express.json())// parse application/x-www-form-urlencoded

dotenv.config() //

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to database');
    } catch (error) {
        const { status, message } = error;
        console.log(status, message)
    }
}

app.listen(process.env.PORT, () => {
    connect()
    console.log(`Server running... ${process.env.PORT} `);
})

