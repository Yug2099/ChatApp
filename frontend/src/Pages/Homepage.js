import React, { useEffect, useState } from "react";
import "./Homepage.css"; // Import your CSS file for styling
import SignUp from "../Components/Signup";
import Login from "../Components/Login";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };
  const navigate = useNavigate();
  useEffect(() => {
    // Use the same key used to store user's details in local storage
    const user = JSON.parse(localStorage.getItem("userInfo")); // Retrieve user's details using "userInfo" as key
    console.log("User(Homepage): ", user);
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <div className="container">
      <h1 className="head">Homepage</h1>
      <div className="buttons">
        <button
          id="button"
          className={showSignUp ? "active" : ""}
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
        <button
          id="button"
          className={showLogin ? "active" : ""}
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>

      {showSignUp && <SignUp />}
      {showLogin && <Login />}
    </div>
  );
};

export default Homepage;
