import { useState } from "react";

// For color-coding events based on category
const eventCategories = ["Meeting", "Birthday", "Holiday", "Other"];

const EventReminder = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    title: "",
    date: "",
    time: "",
    category: "Meeting", // Default category
    description: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // Handle form submission to add new event
  const handleAddEvent = () => {
    if (!event.title || !event.date || !event.time) {
      alert("Please fill in all required fields.");
      return;
    }

    setEvents([...events, event]);
    setEvent({ title: "", date: "", time: "", category: "Meeting", description: "" });
  };

  // Handle event deletion
  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  // Color-code events based on category
  const getEventCategoryColor = (category) => {
    switch (category) {
      case "Meeting":
        return "bg-amber-500"; // Warm amber
      case "Birthday":
        return "bg-pink-500"; // Warm pink
      case "Holiday":
        return "bg-teal-500"; // Warm teal
      default:
        return "bg-orange-500"; // Default warm orange
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-yellow-100 via-pink-100 to-teal-100 min-h-screen">
      <h2 className="text-4xl font-semibold text-center text-gray-700 mb-8">Event Reminder</h2>

      {/* Form for Adding Events */}
      <div className="max-w-4xl mx-auto p-6 border bg-white rounded-lg shadow-lg space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Event</h3>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={event.title}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <div className="flex space-x-4">
            <input
              type="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <select
            name="category"
            value={event.category}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {eventCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <textarea
            name="description"
            placeholder="Event Description (Optional)"
            value={event.description}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          ></textarea>

          <button
            onClick={handleAddEvent}
            className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white py-4 rounded-lg hover:bg-gradient-to-l focus:outline-none"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* Displaying List of Events */}
      <div className="max-w-4xl mx-auto mt-8 space-y-4">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events added yet.</p>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              className={`border p-4 rounded-lg shadow-lg flex justify-between items-center ${getEventCategoryColor(event.category)} text-white`}
            >
              <div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p>{event.category} - {event.date} at {event.time}</p>
                <p>{event.description}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleDeleteEvent(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                <button className="text-yellow-300 hover:text-yellow-500">Edit</button> {/* Placeholder for edit */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventReminder;
