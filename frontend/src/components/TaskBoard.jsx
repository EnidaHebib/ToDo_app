import { useState, useEffect } from "react";

const TaskBoard = () => {
  const [boardTasks, setBoardTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", status: "" });
  const [addingStatus, setAddingStatus] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/api/board-tasks")
      .then((res) => res.json())
      .then((data) => setBoardTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleAddTask = async () => {
    if (!newTask.title) return;
    try {
      const response = await fetch("http://localhost:5001/api/board-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const createdTask = await response.json();
        setBoardTasks([...boardTasks, createdTask]);
        setNewTask({ title: "", status: "" });
        setAddingStatus(null);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/board-tasks/${taskId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        const updatedTask = await response.json();
        setBoardTasks(
          boardTasks.map((task) =>
            task._id === taskId ? updatedTask : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/board-tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setBoardTasks(boardTasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const renderColumn = (status, bgColor) => (
    <div className={`${bgColor} p-4 rounded-lg shadow-md`}>
      <h2 className="text-xl font-semibold mb-3">{status}</h2>
      {boardTasks
        .filter((task) => task.status === status)
        .map((task) => (
          <div
            key={task._id}
            className="bg-white p-3 mt-2 shadow rounded-lg flex flex-col justify-between items-start"
          >
            <div
              className="text-lg font-semibold mb-2"
              style={{
                whiteSpace: "pre-wrap", // Added to preserve line breaks
                wordBreak: "break-word", // Ensure long words break correctly
              }}
            >
              {task.title}
            </div>

            <div className="flex flex-col space-y-2 w-full">
              {status === "To Start" && (
                <>
                  <button
                    onClick={() => handleUpdateStatus(task._id, "In Progress")}
                    className="btn btn-outline btn-yellow w-full"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(task._id, "Completed")}
                    className="btn btn-outline btn-green w-full"
                  >
                    Completed
                  </button>
                </>
              )}
              {status === "In Progress" && (
                <button
                  onClick={() => handleUpdateStatus(task._id, "Completed")}
                  className="btn btn-outline btn-green w-full"
                >
                  Completed
                </button>
              )}
            </div>

            <button
              onClick={() => handleDeleteTask(task._id)}
              className="text-red-500 font-bold text-lg mt-3"
            >
              ✖
            </button>
          </div>
        ))}
      {addingStatus === status ? (
        <div className="mt-4">
          <textarea
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ title: e.target.value, status })}
            className="w-full p-2 border rounded text-sm break-words resize-none"
            rows="4"
          />
          <button
            onClick={handleAddTask}
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
          >
            Add Task
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAddingStatus(status)}
          className="mt-4 w-full py-2 bg-gray-300 text-center rounded-lg hover:bg-gray-400 transition-colors"
        >
          <span className="mr-2">+</span> Add New
        </button>
      )}
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
