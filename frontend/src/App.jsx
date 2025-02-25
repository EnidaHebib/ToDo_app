import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskForm from "./components/TaskForm";
import UpdateTask from "./components/UpdateTask";
import CalendarView from "./pages/CalendarView";
import Notepad from "./pages/Notepad";
import EventReminder from "./pages/EventReminder";
import Personal from "./pages/Personal"; // Import Personal.jsx here
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const loginUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));  
    setUser(userData);  
  };

  const logoutUser = () => {
    localStorage.removeItem('user');  
    setUser(null);  
  };

  return (
    <>
      <Nav isLoggedIn={user !== null} userName={user ? user.name : ''} logout={logoutUser} />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/notepad" element={<Notepad />} />
          <Route path="/event-reminder" element={<EventReminder />} />
          <Route path="/personal" element={<Personal />} /> {/* Add the route for Personal.jsx */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
