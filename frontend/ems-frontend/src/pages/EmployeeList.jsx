import React, { useState, useEffect } from "react";
import { fetchEmployees, deleteEmployee } from "../utils/EmployeeHelper";
import { useNavigate, Link } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [addBtnHover, setAddBtnHover] = useState(false);
  const [editBtnHover, setEditBtnHover] = useState(null);
  const [deleteBtnHover, setDeleteBtnHover] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);

  const navigate = useNavigate();

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees();
      if (data.success) {
        setEmployees(data.employees);
      } else {
        alert(data.error || "Failed to fetch employees");
      }
    } catch (err) {
      alert("Error fetching employees");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id, fullName) => {
    if (!window.confirm(`Delete employee "${fullName}"?`)) return;
    try {
      const data = await deleteEmployee(id);
      if (data.success) {
        alert("Employee deleted");
        loadEmployees();
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch {
      alert("Error deleting employee");
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.firstName || ""} ${emp.lastName || ""}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Employee List</h2>
      <div style={styles.controls}>
        <input
          style={inputFocused ? { ...styles.input, ...styles.inputFocus } : styles.input}
          placeholder="Search Employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <Link
          to="/add-employee"
          style={addBtnHover ? { ...styles.addButton, ...styles.addButtonHover } : styles.addButton}
          onMouseEnter={() => setAddBtnHover(true)}
          onMouseLeave={() => setAddBtnHover(false)}
        >
        <AddCircleIcon ></AddCircleIcon>Add Employee
        </Link>
      </div>

      {loading ? (
        <p>Loading employees...</p>
      ) : filteredEmployees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Gender</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Age</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Position</th>
                <th style={styles.th}>Salary</th>
                <th style={{ ...styles.th, ...styles.actionsHeader }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, index) => (
                <tr
                  key={emp._id}
                  style={{
                    ...styles.tr,
                    ...(index % 2 !== 0 ? styles.striped : {}),
                    // Applying top border radius to the first row and bottom border radius to the last row
                    ...(index === 0 ? styles.firstRow : {}),
                    ...(index === filteredEmployees.length - 1 ? styles.lastRow : {}),
                  }}
                >
                  <td style={styles.td}>{`${emp.firstName || ""} ${emp.lastName || ""}`}</td>
                  <td style={styles.td}>{emp.email || "-"}</td>
                  <td style={styles.td}>{emp.gender ? emp.gender.charAt(0).toUpperCase() + emp.gender.slice(1) : "-"}</td>
                  <td style={styles.td}>{emp.phone || "-"}</td>
                  <td style={styles.td}>{emp.age !== undefined ? emp.age : "-"}</td>
                  <td style={styles.td}>{emp.department || "-"}</td>
                  <td style={styles.td}>{emp.position || "-"}</td>
                  <td style={styles.td}>{emp.salary !== undefined ? `
Rs ${emp.salary}` : "-"}</td>
                  <td style={styles.td}>
                    <div style={styles.actionButtonsContainer}>
                      <button
                        style={editBtnHover === emp._id ? { ...styles.editButton, ...styles.editButtonHover } : styles.editButton}
                        onMouseEnter={() => setEditBtnHover(emp._id)}
                        onMouseLeave={() => setEditBtnHover(null)}
                        onClick={() => navigate(`/edit-employee/${emp._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        style={deleteBtnHover === emp._id ? { ...styles.deleteButton, ...styles.deleteButtonHover } : styles.deleteButton}
                        onMouseEnter={() => setDeleteBtnHover(emp._id)}
                        onMouseLeave={() => setDeleteBtnHover(null)}
                        onClick={() => handleDelete(emp._id, `${emp.firstName} ${emp.lastName}`)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 1000,
    margin: "50px auto",
    padding: 30,
    backgroundColor: "#fefefe",
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: 32,
    marginBottom: 25,
    color: "#222",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  input: {
    flexGrow: 1,
    padding: 14,
    fontSize: 18,
    borderRadius: 8,
    border: "2px solid #ddd",
    marginRight: 20,
    outline: "none",
    transition: "border-color 0.3s ease",
    boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
  },
  inputFocus: {
    borderColor: "#007bff",
    boxShadow: "0 0 8px rgba(0,123,255,0.3)",
  },
  addButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: "700",
    fontSize: 16,
    boxShadow: "0 6px 14px rgba(0,123,255,0.45)",
    userSelect: "none",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  addButtonHover: {
    backgroundColor: "#0056b3",
    boxShadow: "0 8px 20px rgba(0,86,179,0.6)",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: 10,
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
    minWidth: "800px",
  },
  tableHead: {
    backgroundColor: "#f4f6f9",
    borderBottom: "2px solid #ddd",
  },
  th: {
    textAlign: "left",
    padding: "14px 12px",
    color: "#555",
    fontWeight: "600",
  },
  tr: {
    borderBottom: "1px solid #eee",
    backgroundColor: "#fff",
    transition: "background-color 0.3s ease",
  },
  td: {
    padding: "14px 12px",
    color: "#444",
    verticalAlign: "middle",
  },
  striped: {
    backgroundColor: "#f9f9f9",
  },
  actionButtonsContainer: {
    display: "flex",
    gap: 8,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 12,
    boxShadow: "0 3px 6px rgba(40,167,69,0.3)",
    transition: "background-color 0.3s ease",
  },
  editButtonHover: {
    backgroundColor: "#1e7e34",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 12,
    boxShadow: "0 3px 6px rgba(220,53,69,0.3)",
    transition: "background-color 0.3s ease",
  },
  deleteButtonHover: {
    backgroundColor: "#a71d2a",
  },
};

export default EmployeeList;