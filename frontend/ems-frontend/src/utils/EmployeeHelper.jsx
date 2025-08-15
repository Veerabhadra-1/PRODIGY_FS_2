import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const getTokenHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// Fetch all employees
export const fetchEmployees = async () => {
  const response = await axios.get(`${API_BASE}/employees`, getTokenHeaders());
  return response.data;
};

// Get employee by ID
export const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_BASE}/employees/${id}`, getTokenHeaders());
  return response.data;
};

// Create new employee
export const createEmployee = async (employee) => {
  const response = await axios.post(`${API_BASE}/employees`, employee, getTokenHeaders());
  return response.data;
};

// Update employee
export const updateEmployee = async (id, employee) => {
  const response = await axios.put(`${API_BASE}/employees/${id}`, employee, getTokenHeaders());
  return response.data;
};

// Delete employee
export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_BASE}/employees/${id}`, getTokenHeaders());
  return response.data;
};
