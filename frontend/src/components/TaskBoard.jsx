import { useState, useEffect } from "react";

const TaskBoard = () => {
  const [boardTasks, setBoardTasks] = useState([]);
  const [newTasks, setNewTasks] = useState({
    "To Start": "",
    "In Progress": "",
    "Completed": "",
  });

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:5001/api/board-tasks")
      .then((res) => res.json())
      .then((data) => setBoardTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Add Task
  const handleAddTask = async (status) => {
    if (!newTasks[status].trim()) return;

    try {
      const response = await fetch("http://localhost:5001/api/board-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTasks[status], status }),
      });

      if (response.ok) {
        const createdTask = await response.json();
        setBoardTasks([...boardTasks, createdTask]);
        setNewTasks({ ...newTasks, [status]: "" });
      }
    } catch (error) {
      console.error("Error adding task:", error);
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
        setBoardTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Render Task Column
  const renderColumn = (status, bgColor) => (
    <div className={`${bgColor} p-4 rounded-lg shadow-md`}>
      <h2 className="text-xl font-semibold mb-3">{status}</h2>

      {/* Task List */}
      {boardTasks
        .filter((task) => task.status === status)
        .map((task) => (
          <div
            key={task._id}
            className="bg-white p-3 mt-2 shadow rounded-lg flex justify-between items-start relative"
          >
            <span className="text-lg whitespace-pre-wrap break-words w-full pr-6">
              {task.title}
            </span>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="text-red-500 font-bold text-xl hover:text-red-700 transition absolute top-2 right-2"
            >
              ✖
            </button>
          </div>
        ))}

      {/* Input for adding new task */}
      <div className="mt-4">
        <textarea
          placeholder="Enter a task..."
          value={newTasks[status]}
          onChange={(e) => setNewTasks({ ...newTasks, [status]: e.target.value })}
          className="w-full p-3 border rounded text-sm resize-none"
          rows="3"
        />
        <button
          onClick={() => handleAddTask(status)}
          className="mt-2 w-full bg-gray-200 text-black text-lg py-2 rounded-lg hover:bg-gray-300 transition"
        >
          <span className="mr-2">+</span> Add New
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Todo</h1>
      <div className="grid grid-cols-3 gap-6">
        {renderColumn("To Start", "bg-gray-100")}
        {renderColumn("In Progress", "bg-yellow-100")}
        {renderColumn("Completed", "bg-green-100")}
      </div>
    </div>
  );
};

export default TaskBoard;
