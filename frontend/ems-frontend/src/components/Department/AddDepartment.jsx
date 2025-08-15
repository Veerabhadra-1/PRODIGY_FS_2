// src/components/Department/AddDepartment.jsx
import React, { useState } from "react";
import API from "../../utils/DepartmentHelper";
import { useNavigate } from "react-router-dom";

export default function AddDepartment() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.createDepartment({ name, description });
      alert("Department added");
      navigate("/departments");
    } catch (error) {
      alert("Failed to add department");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Add Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Department Name</label>
          <input
            type="text"
            className="form-control"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Department
        </button>
      </form>
    </div>
  );
}
