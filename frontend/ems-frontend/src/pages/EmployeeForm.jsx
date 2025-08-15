import React, { useEffect, useState } from "react";
import { createEmployee, fetchEmployee, updateEmployee } from "../services/employeeService";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeForm() {
  const { id } = useParams(); // undefined for create
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    department: "",
    position: "",
    salary: "",
    gender: "", 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchEmployee(id);
        const emp = res.data.employee;
        setForm({
          firstName: emp.firstName || "",
          lastName: emp.lastName || "",
          email: emp.email || "",
          phone: emp.phone || "",
          age: emp.age || "",
          department: emp.department || "",
          position: emp.position || "",
          salary: emp.salary || "",
          gender: emp.gender || "", 
        });
      } catch (err) {
        alert("Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateEmployee(id, form);
        alert("Updated");
      } else {
        await createEmployee(form);
        alert("Created");
      }
      navigate("/employees");
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>{id ? "Edit Employee" : "Add Employee"}</h3>
      <form onSubmit={submit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">First name</label>
          <input
            name="firstName"
            className="form-control"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last name</label>
          <input
            name="lastName"
            className="form-control"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender Radio Buttons inserted just after email */}
        <div className="col-md-6">
          <label className="form-label d-block">Gender</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={form.gender === "male"}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={form.gender === "female"}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Age</label>
          <input
            name="age"
            type="number"
            className="form-control"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Department</label>
          <input
            name="department"
            className="form-control"
            value={form.department}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Position</label>
          <input
            name="position"
            className="form-control"
            value={form.position}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Salary</label>
          <input
            name="salary"
            type="number"
            className="form-control"
            value={form.salary}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
