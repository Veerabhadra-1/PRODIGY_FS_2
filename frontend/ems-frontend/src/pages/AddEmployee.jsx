import React, { useState } from "react";
import { createEmployee } from "../utils/EmployeeHelper";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  // Employee state
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    age: "",
    department: "",
    position: "",
    salary: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  // Regex for email validation
  const emailRegex = /^\S+@\S+\.\S+$/;

  // Handle input change and validate as user types
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate single field
    setErrors((prev) => {
      const newErrors = { ...prev };

      switch (name) {
        case "firstName":
        case "lastName":
          if (!value.trim()) newErrors[name] = `${name === "firstName" ? "First" : "Last"} name is required.`;
          else delete newErrors[name];
          break;

        case "email":
          if (!emailRegex.test(value)) newErrors.email = "Please enter a valid email.";
          else delete newErrors.email;
          break;

        case "gender":
          if (!value) newErrors.gender = "Please select a gender.";
          else delete newErrors.gender;
          break;

        case "age":
          if (value && (isNaN(value) || Number(value) < 0)) newErrors.age = "Age must be a number >= 0.";
          else delete newErrors.age;
          break;

        case "salary":
          if (value && (isNaN(value) || Number(value) < 0)) newErrors.salary = "Salary must be a number >= 0.";
          else delete newErrors.salary;
          break;

        default:
          break;
      }

      return newErrors;
    });
  };

  // Final validation before submit
  const validateForm = () => {
    const newErrors = {};

    if (!employee.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!employee.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!emailRegex.test(employee.email)) newErrors.email = "Please enter a valid email.";
    if (!employee.gender) newErrors.gender = "Please select a gender.";
    if (employee.age && (isNaN(employee.age) || Number(employee.age) < 0)) newErrors.age = "Age must be a number >= 0.";
    if (employee.salary && (isNaN(employee.salary) || Number(employee.salary) < 0)) newErrors.salary = "Salary must be a number >= 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...employee,
        salary: employee.salary !== "" ? Number(employee.salary) : undefined,
        age: employee.age !== "" ? Number(employee.age) : undefined,
      };

      const data = await createEmployee(payload);

      if (data.success) {
        alert("Employee added successfully!");
        navigate("/");
      } else {
        alert(data.message || "Failed to add employee.");
      }
    } catch (error) {
      alert(error.message || "Error adding employee.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add New Employee</h2>

        <form style={styles.form} onSubmit={handleSubmit} noValidate>
          {/* First Name */}
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            value={employee.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
            disabled={loading}
          />

          {/* Last Name */}
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            value={employee.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
            disabled={loading}
          />

          {/* Email */}
          <InputField
            label="Email"
            name="email"
            type="email"
            value={employee.email}
            onChange={handleChange}
            error={errors.email}
            required
            disabled={loading}
          />

          {/* Gender Radio Buttons */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Gender *</label>
            <div>
              {["Male", "Female"].map((genderOption) => (
                <label key={genderOption} style={{ marginRight: 20 }}>
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    checked={employee.gender === genderOption}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />{" "}
                  {genderOption}
                </label>
              ))}
            </div>
            {errors.gender && <p style={styles.errorText}>{errors.gender}</p>}
          </div>

          {/* Other Fields */}
          <InputField label="Phone" name="phone" type="text" value={employee.phone} onChange={handleChange} disabled={loading} />
          <InputField
            label="Age"
            name="age"
            type="number"
            min={0}
            value={employee.age}
            onChange={handleChange}
            error={errors.age}
            disabled={loading}
          />
          <InputField label="Department" name="department" type="text" value={employee.department} onChange={handleChange} disabled={loading} />
          <InputField label="Position" name="position" type="text" value={employee.position} onChange={handleChange} disabled={loading} />
          <InputField
            label="Salary"
            name="salary"
            type="number"
            min={0}
            value={employee.salary}
            onChange={handleChange}
            error={errors.salary}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || Object.keys(errors).length > 0}
            style={{ ...styles.button, opacity: loading || Object.keys(errors).length > 0 ? 0.6 : 1 }}
          >
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable input field component with error display
const InputField = ({ label, name, type, value, onChange, error, required, disabled, min }) => (
  <div style={styles.inputGroup}>
    <label htmlFor={name} style={styles.label}>
      {label} {required && "*"}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      min={min}
      placeholder={label}
      style={{ ...styles.input, borderColor: error ? "red" : "#ddd" }}
      autoComplete="off"
    />
    {error && <p style={styles.errorText}>{error}</p>}
  </div>
);

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: "0 15px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 30,
    boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  input: {
    padding: 14,
    fontSize: 16,
    borderRadius: 10,
    border: "2px solid #ddd",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    fontFamily: "inherit",
  },
  button: {
    marginTop: 10,
    padding: 16,
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(0,123,255,0.5)",
    transition: "background-color 0.3s ease",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
};

export default AddEmployee;
