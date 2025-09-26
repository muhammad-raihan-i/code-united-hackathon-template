//users have username and password
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

export default function Register() {
  const [username, SETusername] = useState("");
  const [password, SETpassword] = useState("");
  const [confirmPassword, SETconfirmPassword] = useState("");
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      // Validate inputs
      if (!username || !password || !confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please fill in all fields",
        });
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Password Mismatch",
          text: "Passwords do not match",
        });
        return;
      }

      // Check password length (optional validation)
      if (password.length < 6) {
        Swal.fire({
          icon: "error",
          title: "Password Too Short",
          text: "Password must be at least 6 characters long",
        });
        return;
      }

      // Make API call to register endpoint
      const response = await axios.post("/register", {
        username,
        password,
      });
      const data = response.data;
      response.ok = response.status >= 200 && response.status < 300;

      if (response.ok) {
        // Registration successful
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: data.message || "Account created successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        // Navigate to login page after successful registration
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Registration failed
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "Unable to create account",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific error responses
      if (error.response && error.response.data) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.response.data.message || "Unable to create account",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Unable to connect to server. Please try again.",
        });
      }
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => SETusername(e.target.value)}
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => SETpassword(e.target.value)}
          placeholder="Enter your password (min. 6 characters)"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => SETconfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
}
