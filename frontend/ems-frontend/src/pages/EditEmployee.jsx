import React, { useState, useEffect } from "react";
import { getEmployeeById, updateEmployee } from "../utils/EmployeeHelper";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmployee = async () => {
      setFetching(true);
      try {
        const data = await getEmployeeById(id);
        if (data.success) {
          setEmployee({
            firstName: data.employee.firstName || "",
            lastName: data.employee.lastName || "",
            email: data.employee.email || "",
            gender: data.employee.gender || "",     
            phone: data.employee.phone || "",
            age: data.employee.age ? data.employee.age.toString() : "",
            department: data.employee.department || "",
            position: data.employee.position || "",
            salary: data.employee.salary ? data.employee.salary.toString() : "",
          });
          setError(null);
        } else {
          setError(data.error || "Employee not found");
        }
      } catch {
        setError("Failed to fetch employee data");
      }
      setFetching(false);
    };
    loadEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) =>
    /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee.firstName.trim() || !employee.lastName.trim()) {
      alert("First and last name are required.");
      return;
    }
    if (!validateEmail(employee.email)) {
      alert("Please enter a valid email.");
      return;
    }
    if (!employee.department.trim()) {
      alert("Department is required.");
      return;
    }
    if (employee.salary && isNaN(Number(employee.salary))) {
      alert("Salary must be a number.");
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        ...employee,
        salary: employee.salary ? Number(employee.salary) : undefined,
        age: employee.age ? Number(employee.age) : undefined,
      };
      const data = await updateEmployee(id, updateData);
      if (data.success) {
        alert("Employee updated successfully!");
        navigate("/");
      } else {
        alert(data.error || "Update failed");
      }
    } catch {
      alert("Error updating employee");
    }
    setLoading(false);
  };

  if (fetching) return <p style={{ textAlign: "center" }}>Loading employee data...</p>;

  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit Employee</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>First Name</label>
        <input
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
          required
        />

        <label style={styles.label}>Last Name</label>
        <input
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
          required
        />

        <label style={styles.label}>Email</label>
        <input
          name="email"
          value={employee.email}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
          type="email"
          required
        />

        {/* Gender Radio Buttons */}
        <label style={styles.label}>Gender</label>
        <div>
          <label style={{ marginRight: 20 }}>
            <input
              type="radio"
              name="gender"
              value="Male"          // Capitalized to match backend enum
              checked={employee.gender === "Male"}
              onChange={handleChange}
              disabled={loading}
              required
            />{" "}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"        // Capitalized to match backend enum
              checked={employee.gender === "Female"}
              onChange={handleChange}
              disabled={loading}
              required
            />{" "}
            Female
          </label>
        </div>

        <label style={styles.label}>Phone</label>
        <input
          name="phone"
          value={employee.phone}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
          type="tel"
        />

        <label style={styles.label}>Age</label>
        <input
          name="age"
          value={employee.age}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
          type="number"
          min="0"
          step="any"
        />

        <label style={styles.label}>Department</label>
        <input
          name="department"
          value={employee.department}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
          required
        />

        <label style={styles.label}>Position</label>
        <input
          name="position"
          value={employee.position}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
        />

        <label style={styles.label}>Salary</label>
        <input
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
          type="number"
          min="0"
          step="any"
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Updating..." : "Update Employee"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 30,
    backgroundColor: "#fefefe",
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    color: "#222",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: "0.05em",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#444",
    marginBottom: 6,
  },
  input: {
    padding: 14,
    fontSize: 16,
    borderRadius: 8,
    border: "2px solid #ddd",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  button: {
    marginTop: 25,
    padding: 16,
    backgroundColor: "#0069d9",
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,105,217,0.6)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
};

export default EditEmployee;
