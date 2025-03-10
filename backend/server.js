import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import boardTaskRoutes from "./routes/boardTaskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import eventRoutes from "./routes/eventRoutes.js"; // Add this
import "./db.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Routes
app.use("/api/board-tasks", boardTaskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/events", eventRoutes); // Add this

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
