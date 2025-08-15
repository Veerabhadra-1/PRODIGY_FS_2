// src/components/Department/EditDepartment.jsx
import React, { useState, useEffect } from "react";
import API from "../../utils/DepartmentHelper";
import { useParams, useNavigate } from "react-router-dom";

export default function EditDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await API.getDepartments();
        const dept = res.data.find((d) => d._id === id);
        if (!dept) {
          alert("Department not found");
          navigate("/departments");
          return;
        }
        setName(dept.name);
        setDescription(dept.description);
      } catch {
        alert("Failed to load department");
      }
    };
    fetchDepartment();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.updateDepartment(id, { name, description });
      alert("Department updated");
      navigate("/departments");
    } catch {
      alert("Failed to update department");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Edit Department</h2>
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
          Update Department
        </button>
      </form>
    </div>
  );
}
