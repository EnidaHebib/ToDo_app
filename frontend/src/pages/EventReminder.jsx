import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// For color-coding events based on category
const eventCategories = ["Meeting", "Birthday", "Holiday", "Other"];

const modernToastConfig = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark", // Modern dark theme
  icon: "🔔", // Custom bell icon
};

const EventReminder = () => {
  const [events, setEvents] = useState([]); // No events initially, will fetch from backend
  const [event, setEvent] = useState({
    title: "",
    date: "",
    time: "",
    category: "Meeting",
    description: "",
  });

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/events");
        const data = await response.json();
        setEvents(data); // Set events from the backend
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("⚠️ Failed to fetch events.", modernToastConfig);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const timeTracker = setInterval(() => {
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
      const currentTime = new Date().toTimeString().slice(0, 5); // Get current time in HH:MM format

      events?.forEach(event => {
        // Ensure event.date and event.time are in the same format
        if (event.date === currentDate && event.time === currentTime) {
          toast.success(`🔔 Reminder: ${event.title} at ${event.time}`, modernToastConfig);

          // Set reminder for 30 minutes later
          setTimeout(() => {
            toast.success(`🔔 Reminder: ${event.title} at ${event.time} - Again!`, modernToastConfig);
          }, 1800000); // 30 minutes in milliseconds
        }
      });
    }, 30000); // Check every 30 seconds for reminders

    return () => clearInterval(timeTracker); // Clean up on component unmount
  }, [events]);

  // Handle form changes
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // Handle form submission to add a new event
  const handleAddEvent = async () => {
    if (!event.title || !event.date || !event.time) {
      toast.error("⚠️ Please fill in all required fields.", modernToastConfig);
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const newEvent = await response.json();
        setEvents([...events, newEvent]);
        toast.success(`✅ Event: ${newEvent.title} was created at ${newEvent.time}`, modernToastConfig);
        setEvent({ title: "", date: "", time: "", category: "Meeting", description: "" });
      } else {
        toast.error("⚠️ Error adding event", modernToastConfig);
      }
    } catch (error) {
      toast.error("⚠️ Failed to add event", modernToastConfig);
      console.error("Error adding event:", error);
    }
  };

  // Handle event deletion
  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedEvents = events.filter((event) => event._id !== id);
        setEvents(updatedEvents);
        toast.info("🗑️ Event deleted.", modernToastConfig);
      } else {
        toast.error("⚠️ Failed to delete event", modernToastConfig);
      }
    } catch (error) {
      toast.error("⚠️ Error deleting event", modernToastConfig);
      console.error("Error deleting event:", error);
    }
  };

  // Color-code events based on category
  const getEventCategoryColor = (category) => {
    switch (category) {
      case "Meeting":
        return "bg-stone-400"; // Neutral stone
      case "Birthday":
        return "bg-rose-300"; // Soft rose
      case "Holiday":
        return "bg-cyan-300"; // Gentle cyan
      default:
        return "bg-stone-300"; // Default neutral tone
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-stone-100 via-rose-100 to-cyan-100 min-h-screen">
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
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <div className="flex space-x-4">
            <input
              type="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
            <input
              type="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <select
            name="category"
            value={event.category}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
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
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          ></textarea>

          <button
            onClick={handleAddEvent}
            className="w-full bg-gradient-to-r from-stone-400 to-rose-400 text-white py-4 rounded-lg hover:bg-gradient-to-l focus:outline-none"
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
          events.map((event) => (
            <div
              key={event._id}
              className={`border p-4 rounded-lg shadow-lg flex justify-between items-center ${getEventCategoryColor(event.category)} text-gray-900`}
            >
              <div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p>{event.category} - {event.date} at {event.time}</p>
                <p>{event.description}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="text-rose-500 hover:text-rose-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventReminder;
