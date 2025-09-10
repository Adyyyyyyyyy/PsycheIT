import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";
import NavBar from "../Navbar";
const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      {/* Header Section - Same as HomePage */}
      <NavBar/>

      {/* Main Content */}
      <div className="main-content">
        <div className="welcome-section">
          <h2>Welcome back, User 1</h2>
          <p>How are you feeling today? I'm here to help with your mental wellness.</p>
        </div>
      </div>

      {/* Robot Icon - Bottom Right */}
      <Link to="/chatbot" className="robot-icon">
        <i className="fas fa-robot"></i>
      </Link>
    </div>
       
  );
};

export default StudentDashboard;