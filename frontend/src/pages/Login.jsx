import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your login logic here (e.g., API request)
  //   console.log('Login form submitted with:', { email, password });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("user")
      // const user = { email, password };
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const result = await response.json();
      localStorage.setItem("user",JSON.stringify(result.user))
      navigate("/"); // Navigate to the home page
    } catch (error) {
      console.error("Error:", error);
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
        <button type="submit" className="btn btn-outline btn-success w-full mt-4">Login</button>
      </form>
    </div>
  );
};

export default Login;
