import express from "express";
import { 
  getBoardTasks, 
  addBoardTask, 
  deleteBoardTask, 
  updateTaskStatus, 
  updateTaskTitle,
  updateBoardTask
} from "../controllers/boardTaskController.js";

const router = express.Router();

// Routes for tasks
router.get("/", getBoardTasks); // Get all board tasks
router.post("/", addBoardTask); // Add new board task
router.delete("/:taskId", deleteBoardTask); // Delete a board task
router.put("/:taskId", updateBoardTask); // Update task status

export default router;
