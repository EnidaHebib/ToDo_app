import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/tasks"); // Updated URL with new port
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/tasks/${id}`, { // Updated URL with new port
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Task List</h2>
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task._id} className="p-4 border rounded shadow">
                        <h3 className="text-xl font-semibold">{task.title}</h3>
                        <p className="text-gray-700">{task.description}</p>
                        {task.dueDate && (
                            <p className="text-gray-500">
                                Due Date: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                        )}
                        <div className="mt-2 space-x-2">
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="btn bg-red-500 text-white hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => navigate(`/update-task/${task._id}`)}
                                className="btn bg-blue-500 text-white hover:bg-blue-700 transition"
                            >
                                Update
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;