import {useState} from 'react'
import { Link } from "react-router-dom";

const Nav = ({ isLoggedIn, userName }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))||"")
  return (
    <nav className="bg-primary text-gray-800 p-4 font-sans">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Taskly hello {user?user.name:""} </h1>
        <div className="space-x-6">
          <Link to="/" className="btn btn-ghost hover:bg-hover">Home</Link>
          {isLoggedIn ? (
            <span className="text-lg">{userName}</span>  // Display user name if logged in
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
