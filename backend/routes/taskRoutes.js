import express from "express";
import { 
    createTask, 
    getTasks, 
    getTask, 
    updateTask, 
    deleteTask 
} from "../controllers/taskController.js"; 

const router = express.Router();

// Create a task
router.post("/", createTask);

// Get all tasks
router.get("/", getTasks);

// Get a single task
router.get("/:id", getTask);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;