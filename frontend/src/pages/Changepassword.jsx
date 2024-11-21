import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./changepassword.module.css";
import Spinner from "../components/Spinner.jsx";

const Changepassword = () => {
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate('/login');
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = {newpassword, confirmpassword };
    setloading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`http://localhost:5000/changepassword`, data, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setloading(false);
      handlelogout();
    } catch (error) {
      console.log(error.message);
      setloading(false);
      alert("Registration error happened, check console");
    }
  };
  return (
    <div className={styles.loginPage}>
    <div className={styles.loginContainer}>
      <h1>Password Change</h1>
      <div>
        <button onClick={handlelogout}>LogOut</button>
      </div>
      <form onSubmit={handlesubmit}>
        <div className={styles.inputGroup}>
          <label>New Password:</label>
          <input
            type="password"
            value={newpassword}
            onChange={(e) => setnewpassword(e.target.value)}
            placeholder="Enter your new password"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit">change</button>
      </form>
    </div>
  </div>
  )
}

export default Changepassword
