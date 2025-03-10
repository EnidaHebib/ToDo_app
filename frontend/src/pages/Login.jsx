import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ loginUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous error

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login, check your credentials.");
      }

      const result = await response.json();
      console.log(result);  // Log the response to check if it contains the user object

      if (result.user) {
        // Successfully logged in
        localStorage.setItem("user", JSON.stringify(result.user));  // Save user in localStorage
        loginUser(result.user);  // Update state in App.jsx
        navigate("/"), { replace: true}; 
        window.location.reload (); // Redirect to home page
      } else {
        throw new Error("Login failed, user data missing.");
      }
    } catch (error) {
      setError(error.message);  // Show error if login fails
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Enter your password"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button type="submit" className="btn btn-outline btn-success w-full mt-4">Login</button>
      </form>
    </div>
  );
};

export default Login;
