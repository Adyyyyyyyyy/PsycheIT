import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>{mode === "signup" ? "Sign Up" : "Login"}</h2>

      {mode === "signup" ? (
        <>
          <input
            type="text"
            placeholder="Enter College Code"
            value={collegeCode}
            onChange={(e) => setCollegeCode(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button
            onClick={handleSignup}
            disabled={signupDone}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: signupDone ? "gray" : "#007bff",
              color: "white",
              border: "none",
              cursor: signupDone ? "not-allowed" : "pointer",
            }}
          >
            {signupDone ? "Credentials Generated" : "Generate Credentials"}
          </button>

          {generatedCreds && (
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <p>
                <strong>User ID:</strong> {generatedCreds.userId}
              </p>
              <p>
                <strong>Password:</strong> {generatedCreds.password}
              </p>
              <p style={{ color: "red", fontSize: "14px" }}>
                ⚠️ Save these credentials securely. They will be needed for
                login.
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </>
      )}

      <div style={{ marginTop: "15px" }}>
        <button
          onClick={() => {
            setMode(mode === "signup" ? "login" : "signup");
            setSignupDone(false);
          }}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {mode === "signup"
            ? "Already have an account? Login"
            : "New user? Sign up"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
