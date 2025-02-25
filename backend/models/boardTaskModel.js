import mongoose from "mongoose";

const boardTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ["To Start", "In Progress", "Completed"],
    required: true,
  },
}, { timestamps: true });

const BoardTask = mongoose.model("BoardTask", boardTaskSchema);

export default BoardTask;
