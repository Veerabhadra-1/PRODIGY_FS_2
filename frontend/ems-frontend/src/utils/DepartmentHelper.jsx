// src/utils/DepartmentHelper.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/departments",
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const getDepartments = () => API.get("/");
const createDepartment = (data) => API.post("/", data);
const updateDepartment = (id, data) => API.put(`/${id}`, data);
const deleteDepartment = (id) => API.delete(`/${id}`);

export default {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
