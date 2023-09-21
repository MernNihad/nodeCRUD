import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";




export const registerStudent = async (req, res, next) => {

    const { name, email, password, phoneNumber, branchRef, courseRef, assignedTrainersRef, github, linkedin } = req.body; // excluse task,

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);

    const hash = bcrypt.hashSync(password, salt);

    const newStudent = new Student({ name, email, password: hash, phoneNumber, branchRef, courseRef, assignedTrainersRef, github, linkedin })  // excluse course ref,assignedStudents

    try {
        const savedStudent = await newStudent.save();

        const { password, ...otherDetails } = savedStudent._doc;

        res.status(200).json(otherDetails);

    } catch (error) {

        next(error)

    }
}



// Update Student
export const updateStudent = async (req, res, next) => {

    const { id } = req.params


    console.log(id)
    console.log(req.isStudent);
    console.log(req.user)

    const { name, email, password, phoneNumber, branchRef, courseRef, assignedTrainersRef, github, linkedin } = req.body; // excluse task,

    let hash;

    if (password) {

        const saltRounds = 10;

        const salt = bcrypt.genSaltSync(saltRounds);

        hash = bcrypt.hashSync(password, salt);
    }

    try {
        if (req?.user?.isAdmin) {
            const updatedStudent = await Student.findByIdAndUpdate(id, { $set: { email, password:hash, phoneNumber, branchRef, name, courseRef, assignedTrainersRef, github, linkedin } }, { new: true });
            res.status(200).json(updatedStudent);
        } else if (req?.user?.isStudent) {
            const updatedStudent = await Student.findByIdAndUpdate(id, { $set: { email, password:hash, phoneNumber, name, github, linkedin } }, { new: true });
            res.status(200).json(updatedStudent);
        } else {
            return next(createError(403, "You are not authorized!"));
        }

    } catch (error) {
        next(error)
    }




}
// -------------------------------------------------





// Delete Student
export const deleteStudent = async (req, res, next) => {
    const { id } = req.params

    try {
        await Student.findByIdAndDelete(id);
        res.status(200).json({ message: "Student has been deleted." });
    } catch (error) {
        next(error)
    }
}
// -----------------------------------------------



// Get Student
export const getStudent = async (req, res, next) => {
    const { id } = req.params
    try {
        const getStudent = await Student.findById(id);
        res.status(200).json(getStudent);
    } catch (error) {
        next(error)
    }
}
// -------------------------------------------





// Get All Student
export const getStudents = async (req, res, next) => {
    try {
        const Students = await Student.find();
        res.status(200).json(Students);
    } catch (error) {
        next(error);
    }
}
// -------------------------------------------------






export const loginStudent = async (req, res, next) => {

    const { email } = req.body;

    try {

        const student = await Student.findOne({ email: email });
        
        if (!student) return next(createError(404, "Student is not founded!"))

        const isPassword = await bcrypt.compare(req.body.password, student.password)      

        if (!isPassword) return next(createError(400, "Wrong username or password!"))

        const { password, isStudent, ...otherDetails } = student._doc;

        const token = jwt.sign({ id: student._id, isStudent: student.isStudent }, process.env.JWT_SECRET)

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(otherDetails);

    } catch (error) {
        
        next(error)
    }
}

