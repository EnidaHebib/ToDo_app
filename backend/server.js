import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import boardTaskRoutes from "./routes/boardTaskRoutes.js"; // Updated route
import userRoutes from "./routes/userRoutes.js";
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
app.use("/api/board-tasks", boardTaskRoutes); // Updated API route
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
