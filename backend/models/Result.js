import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Result", ResultSchema,"results");
