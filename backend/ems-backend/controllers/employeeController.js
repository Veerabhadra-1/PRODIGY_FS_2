import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Employee from "../models/Employee.js";

export const listEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json({ success: true, employees });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(400).json({ success: false, message: "Invalid id" });
  
  try {
    const emp = await Employee.findById(id);
    if (!emp) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, employee: emp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const { firstName, lastName, email, phone, age, gender, department, position, salary } = req.body;

    const exists = await Employee.findOne({ email });
    if (exists) 
      return res.status(400).json({ success: false, message: "Employee with this email already exists" });

    const emp = new Employee({ firstName, lastName, email, phone, age, gender, department, position, salary });
    await emp.save();
    res.status(201).json({ success: true, employee: emp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(400).json({ success: false, message: "Invalid id" });

  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const updated = await Employee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, employee: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(400).json({ success: false, message: "Invalid id" });

  try {
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
