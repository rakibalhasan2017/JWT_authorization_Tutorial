import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import Spinner from "../components/Spinner.jsx";

const Login = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { name, password };
    setloading(true);
    try {
      const response = await axios.post(`http://localhost:5000/login`, data);
      setloading(false);
      navigate("/changepassword");
    } catch (error) {
      console.log(error.message);
      setloading(false);
      alert("Login error happened, check console");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1>Log In</h1>
        <form onSubmit={handlesubmit}>
          <div className={styles.inputGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
