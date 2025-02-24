import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskForm from "./components/TaskForm"; // Import TaskForm
import UpdateTask from "./components/UpdateTask";
import Footer from "./components/Footer"; // Import Footer
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Get user info from localStorage or default to null
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // Update user state when the user logs in or out
  const loginUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));  // Store user in localStorage
    setUser(userData);  // Update the state
  };

  const logoutUser = () => {
    localStorage.removeItem('user');  // Remove from localStorage
    setUser(null);  // Update state to logged-out
  };

  return (
    <>
      <Nav isLoggedIn={user !== null} userName={user ? user.name : ''} logout={logoutUser} />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl text-center mb-6"></h1>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Render Home here */}
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
