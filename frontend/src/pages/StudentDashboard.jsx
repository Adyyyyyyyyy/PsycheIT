import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import NavBar from "../Navbar";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState("User");

  // Function to decode JWT and extract user ID
  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return "User";
      
      // JWT has 3 parts separated by dots: header.payload.signature
      const payload = token.split('.')[1];
      if (!payload) return "User";
      
      // Decode base64 payload
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.userId || "User";
    } catch (error) {
      console.error("Error decoding token:", error);
      return "User";
    }
  };

  useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    setUserId(userIdFromToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    navigate("/auth");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleViewAccount = () => {
    // Handle view account functionality
    console.log("View account credentials");
    setShowDropdown(false);
  };

  return (
    <div className="student-dashboard">
      <NavBar/>

      <div className="main-content">
        <div className="welcome-section">
          <h2>Welcome back, {userId}</h2>
          <p>How are you feeling today? I'm here to help with your mental wellness.</p>
        </div>

        {/* Feature Tiles Section */}
        <div className="features-section">
          <Link to="/chatbot" className="feature-tile-link">
            <div className="feature-tile">
              <div className="feature-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h3>AI Chatbot Support</h3>
              <p>Get instant mental health support and guidance from our AI-powered chatbot, available 24/7.</p>
            </div>
          </Link>
          
          <Link to="/forum" className="feature-tile-link">
            <div className="feature-tile">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Peer Forum</h3>
              <p>Connect with others in a safe space to share experiences and support each other's mental wellness journey.</p>
            </div>
          </Link>
          
          <Link to="/resources" className="feature-tile-link">
            <div className="feature-tile">
              <div className="feature-icon">
                <i className="fas fa-book"></i>
              </div>
              <h3>Resource Hub</h3>
              <p>Access mental health articles, educational videos, and evidence-based content curated by professionals.</p>
            </div>
          </Link>
          
          <Link to="/screening" className="feature-tile-link">
            <div className="feature-tile">
              <div className="feature-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3>Mental Health Screening</h3>
              <p>Take PHQ-9 and GAD-7 self-assessment questionnaires to better understand your mental wellness.</p>
            </div>
          </Link>
          
          <Link to="/book" className="feature-tile-link">
            <div className="feature-tile">
              <div className="feature-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3>Book Sessions</h3>
              <p>Schedule professional therapy sessions with qualified mental health practitioners at your convenience.</p>
            </div>
          </Link>
          
          <div className="feature-tile">
            <div className="feature-icon">
              <i className="fas fa-pen-fancy"></i>
            </div>
            <h3>Journaling</h3>
            <p>Write personal journal entries and gain insights from your thoughts and emotions over time.</p>
          </div>
        </div>
      </div>

      {/* Profile Button - Bottom Left */}
      <div className="profile-button" onClick={toggleDropdown}>
        <i className="fas fa-user"></i>
        {showDropdown && (
          <div className="profile-dropdown">
            <div className="dropdown-item" onClick={handleViewAccount}>
              <i className="fas fa-id-card"></i>
              View Account
            </div>
            <div className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Sign Out
            </div>
          </div>
        )}
      </div>

      {/* Chatbot Button - Bottom Right */}
      <Link to="/chatbot" className="robot-icon">
        <i className="fas fa-robot"></i>
      </Link>
    </div>
  );
};

export default StudentDashboard;
