import { useState } from 'react';
import { Link } from "react-router-dom";

const Nav = ({ isLoggedIn, userName }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");

  const logout = () => {
    localStorage.removeItem("user");  // Remove user from localStorage
    setUser(null);  // Update state to reflect the user is logged out
  };

  return (
    <nav className="bg-transparent text-gray-800 p-4 font-sans fixed w-full top-0 left-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Updated font to a more curvy style (Cursive) and set text color to black */}
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
