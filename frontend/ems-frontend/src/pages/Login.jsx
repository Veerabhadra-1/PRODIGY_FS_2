import React, { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;
      login(token, user);
      if (user.role === "admin") navigate("/employees");
      else navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>Login</h3>
        <form onSubmit={submit} style={styles.form}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
          <label style={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 420,
    margin: "60px auto",
    padding: "0 15px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 30,
    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
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
    borderRadius: 10,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,123,255,0.5)",
    transition: "background-color 0.3s ease",
  },
};


