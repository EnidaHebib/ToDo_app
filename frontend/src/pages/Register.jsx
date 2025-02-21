import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // const response = await fetch('http://localhost:5001/api/users/register', { // Ensure the URL is correct
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   // body: JSON.stringify({ email, password })
      //   body: { email, password },
      // });


      // if (!response.ok) {
      //   throw new Error('Registration failed');
      // }

      // const data = await response.json();
      const data = { email, password,name };
      const response = await axios.post('http://localhost:5001/api/users/register', data);
      console.log('User registered:',response.data);
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
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
          <label htmlFor="name" className="block text-sm font-medium mb-2">User name</label>
          <input
            id="email"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered w-full"
            placeholder="Enter your name"
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
          />
        </div>
        <button type="submit" className="btn btn-outline btn-success w-full mt-4">Register</button>
      </form>
    </div>
  );
};

export default Register;