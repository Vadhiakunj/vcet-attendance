// src/components/Login.js
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="loginPage">
      <div className="fullLoginBox">
        <h1 className="loginTitle">VCET Attendance</h1>
        <div className="innerLoginBox">
          <h2 className="">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password input"
          />
          <button onClick={handleLogin} className="loginButton">
            Login
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
