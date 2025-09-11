import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import NavBar from "../Navbar";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    navigate("/auth");
  };

  return (
    <div className="student-dashboard">
      <NavBar/>

      <div className="main-content">
        <div className="welcome-section">
          <h2>Welcome back, User</h2>
          <p>How are you feeling today? I'm here to help with your mental wellness.</p>
          <button onClick={handleLogout} style={{ marginTop: "1rem", padding: "0.5rem 1rem", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Sign Out
          </button>
        </div>
      </div>

      <Link to="/chatbot" className="robot-icon">
        <i className="fas fa-robot"></i>
      </Link>
    </div>
  );
};

export default StudentDashboard;
