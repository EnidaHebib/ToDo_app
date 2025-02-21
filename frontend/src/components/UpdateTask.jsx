import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/tasks/${id}`); // Updated URL with new port
            const data = await response.json();
            setTitle(data.title);
            setDescription(data.description);
            setDueDate(data.dueDate);
        } catch (error) {
            console.error("Error fetching task:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedTask = { title, description, dueDate };

        try {
            const response = await fetch(`http://localhost:5001/api/tasks/${id}`, { // Updated URL with new port
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            navigate("/tasks");
        } catch (error) {
            console.error("Error updating task:", error);
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
                Update Task
            </button>
        </form>
    );
};

export default UpdateTask;