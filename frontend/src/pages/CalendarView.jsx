import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import styles

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [taskInput, setTaskInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handle date selection and open input modal
  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);
    setShowModal(true);
  };

  // Save task for selected date
  const handleSaveTask = () => {
    if (taskInput.trim()) {
      setTasks((prev) => ({
        ...prev,
        [selectedDate.toDateString()]: taskInput,
      }));
    }
    setTaskInput("");
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-16">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 mt-16">📅 Monthly Planner</h1> {/* Adjusted margin-top */}

      {/* Calendar Component */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mb-8"> {/* More spacing */}
        <Calendar
          onChange={setDate}
          value={date}
          className="w-full border-none"
          tileClassName={({ date }) =>
            tasks[date.toDateString()]
              ? "bg-blue-500 text-white rounded-lg"
              : "hover:bg-gray-200 transition-all duration-300 rounded-lg"
          }
          onClickDay={handleDateClick}
          navigationLabel={({ date }) =>
            `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
          }
          prevLabel="◀"
          nextLabel="▶"
        />
      </div>

      {/* Task List Below Calendar */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">📌 Tasks:</h2> {/* More spacing */}
        <ul>
          {Object.entries(tasks).map(([date, task]) => (
            <li key={date} className="p-3 bg-white shadow-md rounded-lg my-2">
              <strong>{date}:</strong> {task}
            </li>
          ))}
        </ul>
      </div>

      {/* Task Input Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-2">Add Task</h3>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              placeholder="Enter task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleSaveTask}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
