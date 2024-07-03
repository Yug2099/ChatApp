import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import { Image } from "@chakra-ui/react";
// const dotenv = require("dotenv");
// import { Image } from "cloudinary-react";

const Signup = () => {
  const navigate = useNavigate();
  // dotenv.config();
  const API_URL = "https://my-chat-app-backend-ten.vercel.app";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pic, setPic] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/yug-chatapp/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url);
      console.log("Image URL:", data.secure_url); // Log the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      alert("Please Fill all the Fields");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log(API_URL);
      const { data } = await axios.post(
        `${API_URL}/api/user`,
        { name, email, password, pic: imageUrl },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <div className="sinput">
          <label htmlFor="name">
            Name<span className="required">*</span>:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="sinput">
          <label htmlFor="email">
            Email Id<span className="required">*</span>:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="sinput">
          <label htmlFor="password">
            Password<span className="required">*</span>:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="sinput">
          <label htmlFor="cpassword">
            Confirm Password<span className="required">*</span>:
          </label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="Re-Enter Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="sinput">
          <label htmlFor="profilePic">Profile Picture:</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        {imageUrl && <Image src={imageUrl} width="150" />}
        <input type="submit" id="submitBtn" value="Submit" />
      </form>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Signup.css";

// const Signup = () => {
//   const navigate = useNavigate(); // Initialize navigate

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     cpassword: "",
//     profilePic: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleProfilePicChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFormData({ ...formData, profilePic: file });
//     } else {
//       setFormData({
//         ...formData,
//         profilePic: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
//       });
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Assuming signup logic here
//     console.log(formData);

//     // Redirect to /chats page after successful signup
//     navigate('/chats');
//   };

//   return (
//     <div className="signup">
//       <form onSubmit={handleSubmit}>
//         <div className="sinput">
//           <label htmlFor="name">Name<span className="required">*</span>:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>
//         <div className="sinput">
//           <label htmlFor="email">Email Id<span className="required">*</span>:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//             autoComplete="email"
//           />
//         </div>
//         <div className="sinput">
//           <label htmlFor="password">Password<span className="required">*</span>:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//             autoComplete="new-password"
//           />
//         </div>
//         <div className="sinput">
//           <label htmlFor="cpassword">Confirm Password<span className="required">*</span>:</label>
//           <input
//             type="password"
//             id="cpassword"
//             name="cpassword"
//             value={formData.cpassword}
//             onChange={handleInputChange}
//             required
//             autoComplete="new-password"
//           />
//         </div>
//         <div className="sinput">
//           <label htmlFor="profilePic">Profile Picture:</label>
//           <input
//             type="file"
//             id="profilePic"
//             name="profilePic"
//             accept="image/*"
//             onChange={handleProfilePicChange}
//           />
//         </div>
//         <input type="submit" id="submitBtn" value="Submit" />
//       </form>
//     </div>
//   );
// };

// export default Signup;

// Signup.js
