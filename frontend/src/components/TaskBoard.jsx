import { useState, useEffect } from "react";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    fetch("http://localhost:5001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Filter tasks by status
  const toStartTasks = tasks.filter((task) => task.status === "To Start");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Todo</h1>

      {/* Grid Layout for Kanban Board */}
      <div className="grid grid-cols-3 gap-6">

        {/* ✅ Column: To Start */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">To Start</h2>
          {toStartTasks.length > 0 ? (
            toStartTasks.map((task) => (
              <div key={task._id} className="bg-white p-3 mt-2 shadow rounded-lg">
                {task.title}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tasks to start</p>
          )}

          {/* Add New Button */}
          <button className="mt-4 w-full py-2 bg-gray-300 text-center rounded-lg hover:bg-gray-400 transition-colors">
            <span className="mr-2">+</span> Add New
          </button>
        </div>

        {/* ✅ Column: In Progress */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">In Progress</h2>
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map((task) => (
              <div key={task._id} className="bg-white p-3 mt-2 shadow rounded-lg">
                {task.title}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tasks in progress</p>
          )}

          {/* Add New Button */}
          <button className="mt-4 w-full py-2 bg-gray-300 text-center rounded-lg hover:bg-gray-400 transition-colors">
            <span className="mr-2">+</span> Add New
          </button>
        </div>

        {/* ✅ Column: Completed */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Completed</h2>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <div key={task._id} className="bg-white p-3 mt-2 shadow rounded-lg">
                {task.title}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tasks completed</p>
          )}

          {/* Add New Button */}
          <button className="mt-4 w-full py-2 bg-gray-300 text-center rounded-lg hover:bg-gray-400 transition-colors">
            <span className="mr-2">+</span> Add New
          </button>
        </div>

      </div>
    </div>
  );
};

export default TaskBoard;
