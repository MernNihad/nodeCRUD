import express from "express";
import { createCourse, deleteCourse, getCourse, getCourses,updateCourse } from "../controllers/course.js"
import { verifyAdmin } from "../utils/verifyToken.js";
// createRoom,
// deleteRoom,
// getRoom,
// getRooms,
// updateRoom

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createCourse)
// UPDATE
router.put("/:id", verifyAdmin, updateCourse)
// DELETE
router.delete("/:id", verifyAdmin, deleteCourse)
// GET
router.get("/:id", getCourse)
// GET ALL
router.get("/", getCourses)


export default router;