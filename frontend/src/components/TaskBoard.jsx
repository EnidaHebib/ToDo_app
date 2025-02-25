import { useState, useEffect } from "react";

const TaskBoard = () => {
  const [boardTasks, setBoardTasks] = useState([]);
  const [newTasks, setNewTasks] = useState({
    "To Start": "",
    "In Progress": "",
    "Completed": "",
  });
  const [editingTask, setEditingTask] = useState(null); // Track which task is being edited

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:5001/api/board-tasks")
      .then((res) => res.json())
      .then((data) => setBoardTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add or Edit Task
  const handleAddOrEditTask = async (status) => {
    if (!newTasks[status].trim()) return;

    try {
      let response;
      if (editingTask) {
        // Update existing task
        response = await fetch(
          `http://localhost:5001/api/board-tasks/${editingTask._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTasks[status], status }),
          }
        );
      } else {
        // Add new task
        response = await fetch("http://localhost:5001/api/board-tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: newTasks[status], status }),
        });
      }

      if (response.ok) {
        const task = await response.json();
        
        // Update boardTasks state based on whether it's a new task or edit
        if (editingTask) {
          setBoardTasks((prevTasks) =>
            prevTasks.map((t) =>
              t._id === task._id ? { ...t, title: task.title } : t
            )
          );
          setEditingTask(null); // Reset editing task after successful update
        } else {
          setBoardTasks((prevTasks) => [...prevTasks, task]);
        }

        setNewTasks({ ...newTasks, [status]: "" });
      }
    } catch (error) {
      console.error("Error adding or editing task:", error);
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/board-tasks/${taskId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        // Remove the deleted task from the state
        setBoardTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Set task to edit
  const handleEditTask = (task) => {
    setNewTasks({ ...newTasks, [task.status]: task.title });
    setEditingTask(task); // Set task for editing
  };

  // Render Task Column
  const renderColumn = (status, bgColor) => (
    <div className={`${bgColor} p-4 rounded-lg shadow-md w-1/3`}>
      <h2 className="text-xl font-semibold mb-3">{status}</h2>

      {/* Task List */}
      <div className="space-y-3">
        {boardTasks
          .filter((task) => task.status === status)
          .map((task) => (
            <div
              key={task._id}
              className="p-3 bg-white rounded-lg shadow-sm"
              style={{
                whiteSpace: "normal", // Allow text wrapping
                wordWrap: "break-word", // Break long words if needed
              }}
            >
              {task.title}

              {/* Edit and Delete Buttons */}
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => handleEditTask(task)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Input for adding or editing task */}
      <div className="mt-4">
        <textarea
          placeholder="Enter a note..."
          value={newTasks[status]}
          onChange={(e) =>
            setNewTasks({ ...newTasks, [status]: e.target.value })
          }
          className="w-full p-3 border rounded text-sm resize-none"
          rows="3"
        />
        <button
          onClick={() => handleAddOrEditTask(status)}
          className="mt-2 w-full bg-gray-200 text-black text-lg py-2 rounded-lg hover:bg-gray-300 transition"
        >
          {editingTask ? "Update Note" : "+ Add Note"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Notepad</h1> {/* Adjusted margin-bottom */}
      <div className="flex justify-center gap-6 w-full max-w-5xl">
        {renderColumn("To Start", "bg-gray-100")}
        {renderColumn("In Progress", "bg-yellow-100")}
        {renderColumn("Completed", "bg-green-100")}
      </div>
    </div>
  );
};

export default TaskBoard;
