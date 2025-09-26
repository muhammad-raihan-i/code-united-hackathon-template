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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "orange",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Register
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label
              htmlFor="username"
              className="form-label"
              style={{ color: "white", fontWeight: "500" }}
            >
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
              style={{
                borderRadius: "10px",
                border: "2px solid white",
                padding: "12px",
              }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "white", fontWeight: "500" }}
            >
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
              style={{
                borderRadius: "10px",
                border: "2px solid white",
                padding: "12px",
              }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="confirmPassword"
              className="form-label"
              style={{ color: "white", fontWeight: "500" }}
            >
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
              style={{
                borderRadius: "10px",
                border: "2px solid white",
                padding: "12px",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "white",
              color: "orange",
              border: "2px solid white",
              marginTop: "20px",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
