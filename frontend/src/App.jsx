import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { EventProvider } from "./context/EventContext"; // Import Event Context

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskForm from "./components/TaskForm";
import UpdateTask from "./components/UpdateTask";
import Notepad from "./pages/Notepad";
import EventReminder from "./pages/EventReminder";
import Personal from "./pages/Personal"; 
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  const loginUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    // Optional: If you want to sync the user state from localStorage every time the app reloads
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <EventProvider> {/* Wrap entire app with EventProvider */}
      <Nav isLoggedIn={!!user} userName={user ? user.name : ""} logout={logoutUser} />

      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={!!user} />} />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
          <Route path="/notepad" element={<Notepad />} />
          <Route path="/event-reminder" element={<EventReminder />} />
          <Route path="/personal" element={<Personal />} />
        </Routes>
      </div>

      <Footer />
      <ToastContainer />  {/* Make sure ToastContainer is included here */}
    </EventProvider>
  );
}

export default App;
