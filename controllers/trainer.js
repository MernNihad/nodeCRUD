import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Trainer from "../models/Trainer.js";




export const createTrainer = async (req, res, next) => {

    const { username, email, password, phoneNumber, branchRef, name } = req.body; // excluse course ref,assignedStudents

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



// Update Trainer
export const updateTrainer = async (req, res, next) => {

    const { id } = req.params

    const { username, email, password, phoneNumber, branchRef, name } = req.body; // excluse course ref,assignedStudents


    let hash;

    if (password) {

        const saltRounds = 10;

        const salt = bcrypt.genSaltSync(saltRounds);

        hash = bcrypt.hashSync(password, salt);
    }

    try {

        if (req?.user?.isTrainer) {

            const updatedTrainer = await Trainer.findByIdAndUpdate(id, { $set: { username, email, password:hash, phoneNumber, name } }, { new: true });
            res.status(200).json(updatedTrainer);


        } else if (req?.user?.isAdmin) {

            const updatedTrainer = await Trainer.findByIdAndUpdate(id, { $set: { username, email, password:hash, phoneNumber, branchRef, name } }, { new: true });
            res.status(200).json(updatedTrainer);

        } else {

            return next(createError(403, "You are not authorized!"));

        }

    } catch (error) {
        next(error)
    }
}
// -------------------------------------------------





// Delete Trainer
export const deleteTrainer = async (req, res, next) => {
    const { id } = req.params

    try {
        await Trainer.findByIdAndDelete(id);
        res.status(200).json({ message: "Trainer has been deleted." });
    } catch (error) {
        next(error)
    }
}
// -----------------------------------------------



// Get Trainer
export const getTrainer = async (req, res, next) => {
    const { id } = req.params
    try {
        const getTrainer = await Trainer.findById(id);
        res.status(200).json(getTrainer);
    } catch (error) {
        next(error)
    }
}
// -------------------------------------------





// Get All Trainer
export const getTrainers = async (req, res, next) => {
    try {
        const Trainers = await Trainer.find();
        res.status(200).json(Trainers);
    } catch (error) {
        next(error);
    }
}
// -------------------------------------------------






export const loginTrainer = async (req, res, next) => {

    const { username, password } = req.body;

    try {
        const trainer = await Trainer.findOne({ username: username });

        if (!trainer) return next(createError(404, "Trainer is not founded!"))

        const isPassword = await bcrypt.compare(req.body.password, trainer.password)

        if (!isPassword) return next(createError(400, "Wrong username or password!"))



        const { password, isTrainer, ...otherDetails } = trainer._doc;

        console.log(trainer._id, trainer.isTrainer)

        const token = jwt.sign({ id: trainer._id, isTrainer: trainer.isTrainer }, process.env.JWT_SECRET)

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(otherDetails);

    } catch (error) {

        next(error)

    }
}
