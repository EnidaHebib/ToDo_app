import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Clear inputs on component mount
  useEffect(() => {
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const data = { email, name, password };
      const response = await axios.post("http://localhost:5001/api/users/register", data);
      console.log("User registered:", response.data);
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
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
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">User Name</label>
          <input
            id="name"  // ✅ Fixed incorrect ID
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Enter your name"
            autoComplete="off"
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
            autoComplete="new-password"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn btn-outline btn-success w-full mt-4">Register</button>
      </form>
    </div>
  );
};

export default Register;
