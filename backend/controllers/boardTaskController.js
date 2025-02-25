import BoardTask from "../models/boardTaskModel.js";

// Add a new task
export const addBoardTask = async (req, res) => {
  try {
    const { title, status } = req.body;

    // Validate the input
    if (!title || !status) {
      return res.status(400).json({ message: "Title and status are required" });
    }

    // Create a new task
    const newTask = new BoardTask({ title, status });
    await newTask.save();

    res.status(201).json(newTask); // Return the created task
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    // Validate status value
    if (!["To Start", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const task = await BoardTask.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json(task); // Return updated task
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks
export const getBoardTasks = async (req, res) => {
  try {
    const tasks = await BoardTask.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task
export const deleteBoardTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await BoardTask.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    console.log(`Deleted Task: ${taskId}`); // Log the task that was deleted
    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
