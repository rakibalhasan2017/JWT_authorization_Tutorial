import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./register.module.css";
import Spinner from "../components/Spinner.jsx";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    setloading(true);
    try {
      const response = await axios.post(`http://localhost:5000/changepassword`, data);
      setloading(false);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      setloading(false);
      alert("Registration error happened, check console");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Navigate to login page on button click
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        {/* Left Section */}
        <div className={styles.imageSection}></div>

        {/* Right Section */}
        <div className={styles.formSection}>
          <div className={styles.logo}>Logo</div>
          <h2 className={styles.formTitle}>Create A New Account</h2>
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
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter Valid Email Address"
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

            <button type="submit">Register</button>
          </form>
          { <div className={styles.registerFooter}>
            <p>Already Have an Account?</p>
            <button onClick={handleLoginRedirect} className={styles.loginButton}>
              Click Here
            </button>
          </div> }
        </div>
      </div>
    </div>
  );
};

export default Register;
