import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import axios from "axios";
// const dotenv = require("dotenv");

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // dotenv.config();
  const API_URL = "https://my-chat-app-backend-ten.vercel.app";
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/user/login`, { email, password });
      const { data } = response;
      console.log("Login successful:", data); // Log user data
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      console.error("Error logging in:", error.message);
      if (error.response && error.response.status === 401) {
        alert("Incorrect email or password. Please try again.");
      } else {
        alert("Error logging in: " + error.message);
      }
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/google-login`, {
        token: credentialResponse.credential,
      });
      const { data } = response;
      console.log("Google login successful:", data); // Log user data
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      console.error("Error with Google login:", error);
    }
  };

  return (
    <div className="lgnForm">
      <form onSubmit={handleSubmit}>
        <div className="linput">
          <label htmlFor="email">Email Id:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="linput">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
            autoComplete="current-password"
          />
        </div>
        <input type="submit" id="submitBtn" value="Submit" />
      </form>
      <div id="signInButton">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default Login;
