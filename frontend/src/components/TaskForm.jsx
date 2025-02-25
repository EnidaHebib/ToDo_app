import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
      id: Date.now(),
    };

    try {
      const response = await fetch("http://localhost:5001/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const result = await response.json();
      console.log("Task added:", result);
      setTasks([...tasks, newTask]);
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueDate("");
      setTaskPriority("medium");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = (task) => {
    console.log(task);
    navigate(`/update-task/${task.id}`);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-full max-w-8xl mx-auto p-8 bg-white rounded-lg shadow-lg mb-2">
      {/* Left Side - Form */}
      <div className="w-full md:w-5/12 p-4">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Create New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="text-lg text-gray-700">Task Title</label>
            <input
              type="text"
              id="title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-4 border rounded-lg text-gray-800 focus:ring-2 focus:ring-green-600"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="text-lg text-gray-700">Description</label>
            <textarea
              id="description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-4 border rounded-lg text-gray-800 focus:ring-2 focus:ring-green-600"
              placeholder="Describe the task"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label htmlFor="dueDate" className="text-lg text-gray-700">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              className="w-full p-4 border rounded-lg text-gray-800 focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <label htmlFor="priority" className="text-lg text-gray-700">Priority</label>
            <select
              id="priority"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="w-full p-4 border rounded-lg text-gray-800 focus:ring-2 focus:ring-green-600"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button type="submit" className="w-full py-4 bg-orange-300 text-white text-xl rounded-lg hover:bg-orange-400 transition-all">
            Add Task
          </button>
        </form>
      </div>

      {/* Right Side - Tasks List */}
      <div className="w-full md:w-5/12 p-4">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Your Tasks</h2>
        <ul className="space-y-4 mt-4">
          {tasks.map((task) => (
            <li key={task.id} className={`border p-6 rounded-lg flex justify-between items-center ${task.priority === "high" ? 'bg-red-100' : task.priority === "medium" ? 'bg-yellow-100' : 'bg-green-100'}`}>
              <div>
                <h3 className="font-semibold text-xl">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                <p className="text-xs text-gray-500">Priority: {task.priority}</p>
              </div>
              <div>
                <button onClick={() => handleUpdate(task)} className="bg-yellow-500 text-white py-2 px-5 rounded-md mr-2">
                  Update
                </button>
                <button className="bg-red-500 text-white py-2 px-5 rounded-md"
                  onClick={() => {
                    setTasks(tasks.filter((t) => t.id !== task.id));
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskForm;
