// src/pages/Auth.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [collegeCode, setCollegeCode] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      // Call backend signup
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeCode }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setCredentials({ userId: data.userId, password: data.password });
      }
    } else {
      // Call backend login
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem("token", data.token); // Save JWT
        navigate("/dashboard");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isSignup ? "Signup" : "Login"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {isSignup ? (
            <>
              <input
                type="text"
                placeholder="College Code"
                value={collegeCode}
                onChange={(e) => setCollegeCode(e.target.value)}
                style={styles.input}
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
            </>
          )}

          <button type="submit" style={styles.button}>
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>

        {/* Show credentials after signup */}
        {credentials && (
          <div style={styles.credentialsBox}>
            <h4>🎉 Your account has been created!</h4>
            <p><strong>User ID:</strong> {credentials.userId}</p>
            <p><strong>Password:</strong> {credentials.password}</p>
            <small>Please save these credentials safely for future logins.</small>
          </div>
        )}

        <p style={styles.toggle}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span style={styles.link} onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Signup"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f3f4f6" },
  card: { background: "#fff", padding: "2rem", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)", width: "350px" },
  title: { textAlign: "center", marginBottom: "1rem" },
  form: { display: "flex", flexDirection: "column" },
  input: { padding: "0.8rem", margin: "0.5rem 0", borderRadius: "6px", border: "1px solid #ccc" },
  button: { background: "#2563eb", color: "#fff", padding: "0.8rem", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "1rem" },
  toggle: { marginTop: "1rem", textAlign: "center" },
  link: { color: "#2563eb", cursor: "pointer" },
  credentialsBox: { marginTop: "1.5rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", background: "#f9fafb" },
};

export default Auth;
