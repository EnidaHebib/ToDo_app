import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

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

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast.error("⚠️ Failed to fetch events.", modernToastConfig);
      }
    };

    fetchEvents();
  }, []);

  // Check events every 30 seconds
  useEffect(() => {
    const timeTracker = setInterval(() => {
      const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
      const currentTime = new Date().toTimeString().slice(0, 5); // HH:MM format

      events?.forEach((event) => {
        if (event.date === currentDate && event.time === currentTime) {
          toast.success(`🔔 Reminder: ${event.title} at ${event.time}`, modernToastConfig);

          // Set reminder for 30 minutes later
          setTimeout(() => {
            toast.success(`🔔 Reminder: ${event.title} at ${event.time} - Again!`, modernToastConfig);
          }, 1800000);
        }
      });
    }, 30000);

    return () => clearInterval(timeTracker);
  }, [events]);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use the event context
export const useEventContext = () => {
  return useContext(EventContext);
};
