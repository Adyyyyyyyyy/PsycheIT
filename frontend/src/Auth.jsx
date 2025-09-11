import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth() {
  const [collegeCode, setCollegeCode] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [generatedCreds, setGeneratedCreds] = useState(null);
  const [mode, setMode] = useState("signup"); // "signup" or "login"
  const [signupDone, setSignupDone] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collegeCode }),
    });

    const data = await res.json();
    if (data.userId) {
      setGeneratedCreds({ userId: data.userId, password: data.password });
      setSignupDone(true); // disable button
    } else {
      alert("Signup failed");
    }
  };

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>{mode === "signup" ? "Create Account" : "Welcome Back"}</h2>
          <p>{mode === "signup" ? "Get your credentials to access PsycheIT" : "Sign in to continue your mental wellness journey"}</p>
        </div>

        <div className="auth-form">
          {mode === "signup" ? (
            <>
              <div className="form-group">
                <label htmlFor="collegeCode">College Code</label>
                <input
                  id="collegeCode"
                  type="text"
                  placeholder="Enter your college code"
                  value={collegeCode}
                  onChange={(e) => setCollegeCode(e.target.value)}
                  className="form-input"
                />
              </div>
              
              <button
                onClick={handleSignup}
                disabled={signupDone || !collegeCode.trim()}
                className={`auth-button ${signupDone ? 'disabled' : 'primary'}`}
              >
                {signupDone ? (
                  <>
                    <i className="fas fa-check"></i>
                    Credentials Generated
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i>
                    Generate Credentials
                  </>
                )}
              </button>

              {generatedCreds && (
                <div className="credentials-display">
                  <h3>
                    <i className="fas fa-key"></i>
                    Your Login Credentials
                  </h3>
                  
                  <div className="credential-item">
                    <div className="credential-label">User ID:</div>
                    <div className="credential-value">{generatedCreds.userId}</div>
                  </div>
                  
                  <div className="credential-item">
                    <div className="credential-label">Password:</div>
                    <div className="credential-value">{generatedCreds.password}</div>
                  </div>
                  
                  <div className="warning-message">
                    <i className="fas fa-exclamation-triangle warning-icon"></i>
                    <span>Please save these credentials securely. You'll need them to login.</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="userId">User ID</label>
                <input
                  id="userId"
                  type="text"
                  placeholder="Enter your User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>
              
              <button
                onClick={handleLogin}
                disabled={!userId.trim() || !password.trim()}
                className="auth-button success"
              >
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </button>
            </>
          )}
        </div>

        <div className="mode-toggle">
          <button
            onClick={() => {
              setMode(mode === "signup" ? "login" : "signup");
              setSignupDone(false);
              setGeneratedCreds(null);
              setCollegeCode("");
              setUserId("");
              setPassword("");
            }}
            className="toggle-button"
          >
            {mode === "signup"
              ? "Already have an account? Sign in"
              : "New to PsycheIT? Create account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
