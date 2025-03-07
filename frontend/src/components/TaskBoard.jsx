import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskBoard = () => {
  const [boardTasks, setBoardTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Start");
  const [editTaskId, setEditTaskId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/api/board-tasks")
      .then((res) => res.json())
      .then((data) => setBoardTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) return;

    const taskToMove = boardTasks.find((task) => task._id === result.draggableId);
    const updatedTask = { ...taskToMove, status: destination.droppableId };

    fetch(`http://localhost:5001/api/board-tasks/${taskToMove._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then(() => {
        setBoardTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === taskToMove._id ? updatedTask : task))
        );
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const newTaskObj = { title: newTask, status: taskStatus };

    fetch("http://localhost:5001/api/board-tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaskObj),
    })
      .then((res) => res.json())
      .then((data) => {
        setBoardTasks([...boardTasks, data]);
        setNewTask("");
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  const handleEditTask = (task) => {
    setEditTaskId(task._id);
    setUpdatedTitle(task.title);
  };

  const handleUpdateTask = () => {
    if (!updatedTitle.trim()) return;

    const taskToUpdate = boardTasks.find((task) => task._id === editTaskId);
    const updatedTask = {
      _id: editTaskId,
      title: updatedTitle,
      status: taskToUpdate.status, // Keep the current status
    };

    fetch(`http://localhost:5001/api/board-tasks/${editTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then(() => {
        setBoardTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editTaskId ? updatedTask : task
          )
        );
        setEditTaskId(null);
        setUpdatedTitle("");
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`http://localhost:5001/api/board-tasks/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        setBoardTasks(boardTasks.filter((task) => task._id !== taskId));
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  const renderColumn = (status, bgColor) => (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`${bgColor} p-6 rounded-lg shadow-md w-1/3 min-h-[450px] mt-4`}
          style={{ maxWidth: "400px" }}
        >
          <h2 className="text-xl font-semibold mb-6">{status}</h2>
          <div className="space-y-6 overflow-y-auto max-h-[400px]">
            {boardTasks
              .filter((task) => task.status === status)
              .map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div className="text-wrap break-words overflow-hidden">
                        {task.title}
                      </div>
                      <div className="mt-3 flex justify-between">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-5 py-3 rounded-md text-sm transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="bg-red-100 text-red-700 hover:bg-red-200 px-5 py-3 rounded-md text-sm transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );

  return (
    <div className="flex flex-col items-center justify-start min-h-screen mt-[-47.8px]">
      <div className="flex flex-col gap-4 w-full max-w-md items-center mt-10">
        {/* Task input row */}
        <div className="flex gap-4 items-center justify-center w-full">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task title"
            className="p-4 border rounded-md w-full text-lg"
            style={{ minWidth: "300px" }}
          />
        </div>

        <div className="mt-4" />

        {/* Row of the dropdown and the button */}
        <div className="flex gap-4 items-center justify-center w-full">
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="p-3 border rounded-md text-lg"
            style={{ minWidth: "150px" }}
          >
            <option value="To Start">To Start</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button
            onClick={handleAddTask}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-6 py-4 rounded-lg text-lg transition-all"
          >
            Add Task
          </button>
        </div>

        <div className="mt-4" />
      </div>

      {/* Edit Task Popup */}
      {editTaskId && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
            <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="p-3 border rounded-md w-full max-w-full overflow-x-auto mb-4 text-lg"
              placeholder="Update task title"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleUpdateTask}
                className="bg-green-500 text-white px-6 py-3 rounded-md text-lg transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setEditTaskId(null)}
                className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-6 py-3 rounded-md text-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-center gap-10 w-full">
          {renderColumn("To Start", "bg-gray-100")}
          {renderColumn("In Progress", "bg-yellow-100")}
          {renderColumn("Completed", "bg-green-100")}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
