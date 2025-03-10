import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const EventReminderContext = createContext();

export const EventReminderProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("⚠️ Failed to fetch events.");
      }
    };

    fetchEvents();
  }, []);

  // Global Reminder Logic
  useEffect(() => {
    const checkReminders = setInterval(() => {
      const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const currentTime = new Date().toTimeString().slice(0, 5); // HH:MM

      events?.forEach((event) => {
        if (event.date === currentDate && event.time === currentTime) {
          toast.success(`🔔 Reminder: ${event.title} at ${event.time}`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });

          // Set a reminder again in 30 minutes
          setTimeout(() => {
            toast.success(`🔔 Reminder: ${event.title} at ${event.time} - Again!`);
          }, 1800000); // 30 minutes later
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkReminders); // Cleanup on unmount
  }, [events]);

  return (
    <EventReminderContext.Provider value={{ events, setEvents }}>
      {children}
    </EventReminderContext.Provider>
  );
};

// Custom hook to use the event reminder context
export const useEventReminder = () => useContext(EventReminderContext);
