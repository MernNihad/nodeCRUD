import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";

const app = express();

app.use(express.json())// parse application/x-www-form-urlencoded

dotenv.config() //

const connect = async (next) => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/demo_1`);
        console.log('Connected to database');
    } catch (error) {
        const { status, message } = error;
        console.log(status, message)
    }
}

app.listen(4000, () => {
    connect()
    console.log(`Server running... ${4000} `);
})

