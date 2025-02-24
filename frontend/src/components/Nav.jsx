import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
  const [user, setUser] = useState(null);  // Initializing state as null

  // Using useEffect to check localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);  // Update state if user is found in localStorage
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Effect hook to update the navbar when localStorage changes (on login or logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange); // Listen for storage changes
    return () => window.removeEventListener("storage", handleStorageChange); // Clean up the event listener
  }, []);

  const logout = () => {
    localStorage.removeItem("user");  // Remove user from localStorage
    setUser(null);  // Update state to reflect the user is logged out
  };

  return (
    <nav className="bg-transparent text-gray-800 p-4 font-sans fixed w-full top-0 left-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-cursive font-semibold" style={{ marginLeft: '2.5cm', color: 'black' }}>
          {user ? `Hello, ${user.name}` : "Welcome to Taskly"}
        </h1>

        <div className="space-x-6">
          <Link to="/" className="btn btn-ghost hover:bg-hover">Home</Link>
          {user ? (
            <>
              <span className="text-lg">{user.name}</span>
              <button
                onClick={logout}
                className="btn btn-ghost hover:bg-hover"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost hover:bg-hover">Login</Link>
              <Link to="/register" className="btn btn-ghost hover:bg-hover">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
