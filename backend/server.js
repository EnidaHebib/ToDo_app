import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // Import user routes
import "./db.js"; // Connect to the database
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
  });
// Routes
app.use("/api/tasks", taskRoutes); // Adjusted tasks route
app.use("/api/users", userRoutes); // Add user routes

// Database connection
// mongoose
//     .connect(process.env.MONGO_URI || "mongodb://localhost:27017/todoapp", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.log(err));

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
