//users have username and password
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

export default function Login() {
  const [username, SETusername] = useState("");
  const [password, SETpassword] = useState("");
  const navigate = useNavigate();
  async function onSubmit(event) {
    event.preventDefault();
    try {
      // Validate inputs
      if (!username || !password) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please fill in both username and password",
        });
        return;
      }
      // Make API call to login endpoint
      const response = await axios.post("/login", {
        username,
        password,
      });
      const data = response.data;
      response.ok = response.status >= 200 && response.status < 300;

      if (response.ok) {
        // Login successful
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Navigate to home or dashboard
        navigate("/");
      } else {
        // Login failed
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to server. Please try again.",
      });
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
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
