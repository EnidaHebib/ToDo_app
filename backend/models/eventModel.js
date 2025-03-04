import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  time: { type: String, required: true }, // Format: HH:MM
  category: { type: String, default: "Other" },
  description: { type: String, default: "" }
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;
