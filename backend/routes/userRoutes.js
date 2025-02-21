import express from "express";
import { registerUser, loginUser,getUsers } from "../controllers/userController.js";

const router = express.Router();

// Register a new user
router.get("/", getUsers);

router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

export default router;