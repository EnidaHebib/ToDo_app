import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, dueDate };

        try {
            const response = await fetch("http://localhost:5001/api/tasks", { // Ensure the URL is correct
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error("Failed to add task");
            }

            const result = await response.json();
            console.log("Task added:", result);
            navigate("/tasks"); // Navigate to the tasks page or any other page
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-button"
                required
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-button"
                required
            />

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-button"
                required
            />

            <button
                type="submit"
                className="btn bg-button text-white w-full hover:bg-hover transition"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;