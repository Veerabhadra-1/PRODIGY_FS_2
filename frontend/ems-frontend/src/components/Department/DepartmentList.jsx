// src/components/Department/DepartmentList.jsx
import React, { useEffect, useState } from "react";
import API from "../../utils/DepartmentHelper";
import { Link } from "react-router-dom";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const res = await API.getDepartments();
      setDepartments(res.data);
    } catch (error) {
      alert("Failed to load departments");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await API.deleteDepartment(id);
      fetchDepartments();
    } catch (error) {
      alert("Failed to delete department");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2>Departments</h2>
      <Link to="/add-department" className="btn btn-success mb-3">
        Add Department
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(({ _id, name, description }) => (
            <tr key={_id}>
              <td>{name}</td>
              <td>{description}</td>
              <td>
                <Link to={`/edit-department/${_id}`} className="btn btn-primary me-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(_id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {departments.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">
                No departments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
