import Department from "../models/Department.js";

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Get one department by ID
const getDepartmentById = async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);
    if (!dept) return res.status(404).json({ message: "Department not found" });
    res.json(dept);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Create new department
const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const exists = await Department.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const newDept = await Department.create({ name, description });
    res.status(201).json(newDept);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Update department by ID
const updateDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const dept = await Department.findById(req.params.id);

    if (!dept) return res.status(404).json({ message: "Department not found" });

    if (name) dept.name = name;
    if (description !== undefined) dept.description = description;

    await dept.save();
    res.json(dept);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Delete department by ID
const deleteDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndDelete(req.params.id);
    if (!dept) return res.status(404).json({ message: "Department not found" });

    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export default {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
