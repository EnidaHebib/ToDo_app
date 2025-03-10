import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateTask = () => {
  const { state } = useLocation();
  const { task } = state || {};
  const [updatedTitle, setUpdatedTitle] = useState(task?.title || "");
  const [updatedDescription, setUpdatedDescription] = useState(task?.description || "");
  const [updatedDueDate, setUpdatedDueDate] = useState(task?.dueDate || "");
  const [updatedPriority, setUpdatedPriority] = useState(task?.priority || "medium");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title: updatedTitle, description: updatedDescription, dueDate: updatedDueDate, priority: updatedPriority };

    // Update task in localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = savedTasks.map((t) => (t.id === task.id ? updatedTask : t));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Go back to the TaskForm page
    navigate(-1); // This will take you back to the previous page (TaskForm)
  };

  return (
    <div className="p-6 bg-gradient-to-r from-stone-100 via-rose-100 to-cyan-100 min-h-screen">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Update Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="text-lg text-gray-700">Task Title</label>
            <input
              type="text"
              id="title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="text-lg text-gray-700">Description</label>
            <textarea
              id="description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="Describe the task"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label htmlFor="dueDate" className="text-lg text-gray-700">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={updatedDueDate}
              onChange={(e) => setUpdatedDueDate(e.target.value)}
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              required
            />
          </div>

          <div>
            <label htmlFor="priority" className="text-lg text-gray-700">Priority</label>
            <select
              id="priority"
              value={updatedPriority}
              onChange={(e) => setUpdatedPriority(e.target.value)}
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-stone-400 to-rose-400 text-white py-4 rounded-lg hover:bg-gradient-to-l focus:outline-none">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
