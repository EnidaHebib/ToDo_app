import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { email,name, password };

        try {
            const response = await fetch("http://localhost:5001/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            const result = await response.json();
            console.log("User registered:", result);
            navigate("/login"); // Navigate to the login page
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <input
                type="text"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-button"
                required
            />
            <input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-button"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-button"
                required
            />

            <button
                type="submit"
                className="btn bg-button text-white w-full hover:bg-hover transition"
            >
                Register
            </button>
        </form>
    );
};

export default Register;