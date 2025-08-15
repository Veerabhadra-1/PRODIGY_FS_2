import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Login from "./pages/Login";

import DepartmentList from "./components/Department/DepartmentList";
import AddDepartment from "./components/Department/AddDepartment";
import EditDepartment from "./components/Department/EditDepartment";

import { AuthContext } from "./context/authContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
     
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

     
        <Route
          path="/"
          element={
            <PrivateRoute>
              <EmployeeList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <PrivateRoute>
              <AddEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-employee/:id"
          element={
            <PrivateRoute>
              <EditEmployee />
            </PrivateRoute>
          }
        />

      
        <Route
          path="/departments"
          element={
            <PrivateRoute>
              <DepartmentList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-department"
          element={
            <PrivateRoute>
              <AddDepartment />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-department/:id"
          element={
            <PrivateRoute>
              <EditDepartment />
            </PrivateRoute>
          }
        />

     
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

