import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import User from "./models/User.js";

const app = express();

app.use(express.json())// parse application/x-www-form-urlencoded

dotenv.config() //



app.post("/api/register", async(req, res) => {
    const { name, email, phone, password, picLink } = req.body
    const newUser = new User({ name, email, phone, password, picLink })
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.json(error.message);
    }
})
app.get("/api", async(req, res) => {
    try {
        const savedUser = await User.find();
        res.status(200).json(savedUser);
    } catch (error) {
        res.json(error.message);
    }
})





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

