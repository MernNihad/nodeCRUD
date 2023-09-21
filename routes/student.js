import express from "express";
import {
    deleteStudent,
    getStudent,
    getStudents,
    loginStudent,
    registerStudent,
    updateStudent,
} from "../controllers/student.js";
import { verifyAdmin, verifyAdminOrStudentRole } from "../utils/verifyToken.js";

const router = express.Router();
// REGISTER
router.post("/register", verifyAdmin, registerStudent ) // to create Student
// LOGIN
router.post("/login", loginStudent) // to create Student
// update
router.put("/:id", verifyAdminOrStudentRole, updateStudent) // to create Student
// DALETE
router.delete("/:id", verifyAdmin, deleteStudent) // to create Student
// get
router.get("/:id", getStudent) // to create Student
// get all
router.get("/", verifyAdmin, getStudents) // to create Student


// verifyAdminOrStudentRole


export default router;