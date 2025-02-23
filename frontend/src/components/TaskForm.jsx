import { useState } from "react";

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [tasks, setTasks] = useState([]); // Store tasks in local state

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add task to state
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      id: Date.now(), // Unique id for each task (you can use a database in the future)
    };
    setTasks([...tasks, newTask]);
    // Clear the input fields
    setTaskTitle("");
    setTaskDescription("");
    setTaskDueDate("");
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <h2 className="text-xl mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Task Title</label>
          <input
            type="text"
            id="title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            id="description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full p-2 border"
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate" className="block">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
            className="w-full p-2 border"
          />
        </div>
        <button type="submit" className="mt-4 py-2 px-4 bg-gray-300 text-black rounded">
          Add Task
        </button>
      </form>

      <h2 className="mt-6 text-xl">Tasks</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="border p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
            </div>
            <div>
              <button className="bg-blue-500 text-white py-1 px-4 rounded mr-2">
                Update
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded"
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
  );
};

export default TaskForm;
