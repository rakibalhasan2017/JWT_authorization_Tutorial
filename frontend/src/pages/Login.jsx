import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
          alert("login error happened, check console");
        }
      };
      if (loading) {
        return <Spinner />;
      }
  return (
    <div>
      
    </div>
  )
}

export default Login
