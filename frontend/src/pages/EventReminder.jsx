import { useState } from "react";
import { useEventContext } from "../context/EventContext";
import { toast } from "react-toastify";

const eventCategories = ["Meeting", "Birthday", "Holiday", "Other"];

const EventReminder = () => {
  const { events, setEvents } = useEventContext();
  const [event, setEvent] = useState({
    title: "",
    date: "",
    time: "",
    category: "Meeting",
    description: "",
  });

  const modernToastConfig = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    icon: "🔔",
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

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

  const getEventCategoryColor = (category) => {
    switch (category) {
      case "Meeting":
        return "bg-stone-400";
      case "Birthday":
        return "bg-rose-300";
      case "Holiday":
        return "bg-cyan-300";
      default:
        return "bg-stone-300";
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-stone-100 via-rose-100 to-cyan-100 min-h-screen">
      <h2 className="text-4xl font-semibold text-center text-gray-700 mb-8">Event Reminder</h2>

      <div className="max-w-4xl mx-auto p-6 border bg-white rounded-lg shadow-lg space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Event</h3>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={event.title}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg shadow-sm"
          />
          <div className="flex space-x-4">
            <input type="date" name="date" value={event.date} onChange={handleChange} className="w-full p-4 border rounded-lg shadow-sm" />
            <input type="time" name="time" value={event.time} onChange={handleChange} className="w-full p-4 border rounded-lg shadow-sm" />
          </div>
          <select name="category" value={event.category} onChange={handleChange} className="w-full p-4 border rounded-lg shadow-sm">
            {eventCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button onClick={handleAddEvent} className="w-full bg-gradient-to-r from-stone-400 to-rose-400 text-white py-4 rounded-lg hover:bg-gradient-to-l">
            Add Event
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 space-y-4">
        {events.map((event) => (
          <div key={event._id} className={`border p-4 rounded-lg shadow-lg flex justify-between ${getEventCategoryColor(event.category)}`}>
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p>{event.date} at {event.time}</p>
              <p>{event.category}</p>
            </div>
            <button onClick={() => handleDeleteEvent(event._id)} className="text-rose-500 hover:text-rose-700">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventReminder;
