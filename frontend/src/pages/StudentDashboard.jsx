import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Navbar";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div className="student-dashboard">
      <NavBar />

      {/* Welcome Section */}
      <div className="main-content">
        <div className="welcome-section">
          <h2>Welcome back, Student</h2>
          <p>
            How are you feeling today? Let’s take a mindful step toward better
            mental wellness.
          </p>
          <div
            className="profile-button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <i className="fas fa-user-circle"></i> Profile
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <button onClick={() => navigate("/account")}>
                Account Credentials
              </button>
              <button onClick={handleLogout}>Sign Out</button>
            </div>
          )}
        </div>

        {/* Tiles */}
        <div className="tiles-grid">
          <Link to="/screening" className="tile">
            <i className="fas fa-clipboard-list"></i>
            <h3>Screening Test</h3>
            <p>Take a quick validated self-assessment.</p>
          </Link>
          <Link to="/journal" className="tile">
            <i className="fas fa-book"></i>
            <h3>Journal</h3>
            <p>Write down your thoughts daily and reflect.</p>
          </Link>
          <Link to="/resources" className="tile">
            <i className="fas fa-lightbulb"></i>
            <h3>Resources</h3>
            <p>Explore helpful guides and coping strategies.</p>
          </Link>
          <Link to="/forum" className="tile">
            <i className="fas fa-users"></i>
            <h3>Forum</h3>
            <p>Connect with peers in a safe community space.</p>
          </Link>
          <Link to="/book" className="tile">
            <i className="fas fa-user-md"></i>
            <h3>Counselling</h3>
            <p>Book sessions with certified counselors.</p>
          </Link>
          <Link to="/chatbot" className="tile">
            <i className="fas fa-robot"></i>
            <h3>AI Chatbot</h3>
            <p>Talk to our AI in your own language.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
