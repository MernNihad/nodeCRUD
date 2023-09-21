import express from "express";
import {
    createTrainer,
    login,
    loginTrainer,
    register
} from "../controllers/auth.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/register", register)
// LOGIN
router.post("/login", login)
// REGISTER
// router.post("/trainer/register",verifyAdmin, createTrainer) // to create trainer
// LOGIN
// router.post("trainer/login", loginTrainer) // to create trainer


export default router;