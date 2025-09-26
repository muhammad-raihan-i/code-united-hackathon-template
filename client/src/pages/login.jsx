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
          Login
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
              placeholder="Enter your password"
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
