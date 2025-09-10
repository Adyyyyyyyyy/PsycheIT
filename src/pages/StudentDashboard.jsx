import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      {/* Header Section - Same as HomePage */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <i className="fas fa-brain"></i>
            PsycheIT
          </div>
          <nav>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#resources">Resources</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <div className="profile-section">
            <div className="profile-icon">
              <i className="fas fa-user-circle"></i>
              <span>User 1</span>
            </div>
          </div>
        </div>
      </header>

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