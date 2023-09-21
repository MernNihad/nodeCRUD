import User from "../models/User.js"
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Trainer from "../models/Trainer.js";


export const register = async (req, res, next) => {

    const { username, email, password } = req.body;

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, email, password: hash })

    try {
        const savedUser = await newUser.save();

        const { password, isAdmin, ...otherDetails } = savedUser._doc;

        res.status(200).json(otherDetails);

    } catch (error) {

        next(error)

    }
}


export const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) return next(createError(404, "User is not founded!"))

        const isPassword = await bcrypt.compare(req.body.password, user.password)

        if (!isPassword) return next(createError(400, "Wrong username or password!"))

        const { password, isAdmin, ...otherDetails } = user._doc;

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(otherDetails);

    } catch (error) {

        next(error)

    }
}



export const createTrainer = async (req, res, next) => {

    const { username, email, password, phoneNumber, branchRef, name } = req.body; // excluse course ref,assignedStudents

    console.log(req.body)

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    const hash = bcrypt.hashSync(password, salt);

    const newTrainer = new Trainer({ username, email, password: hash, phoneNumber, branchRef, name })  // excluse course ref,assignedStudents

    try {
        const savedTrainer = await newTrainer.save();

        const { password, ...otherDetails } = savedTrainer._doc;

        res.status(200).json(otherDetails);

    } catch (error) {

        next(error)

    }
}


export const loginTrainer = async (req, res, next) => {

    const { username, password } = req.body;

    try {
        const trainer = await Trainer.findOne({ username: username });

        if (!trainer) return next(createError(404, "Trainer is not founded!"))

        const isPassword = await bcrypt.compare(req.body.password, trainer.password)

        if (!isPassword) return next(createError(400, "Wrong username or password!"))



        const { password, isTrainer, ...otherDetails } = trainer._doc;

        console.log(trainer._id, trainer.isTrainer)

        const token = jwt.sign({ id: trainer._id, isUser: trainer.isTrainer }, process.env.JWT_SECRET)

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(otherDetails);

    } catch (error) {

        next(error)

    }
}
