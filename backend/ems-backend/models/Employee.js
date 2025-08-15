import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  phone: { 
    type: String, 
    match: /^[0-9]{10}$/ // Example: 10-digit number
  },
  age: { type: Number, min: 0 },
  gender: { 
    type: String, 
    enum: ["Male", "Female"], 
    required: true 
  },
  department: { type: String, trim: true },
  position: { type: String, trim: true },
  salary: { type: Number, min: 0 }
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
