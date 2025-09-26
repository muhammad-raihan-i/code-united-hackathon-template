const { User } = require("../models");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("../helpers/jwt");

class UserController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;

      // Validate required fields
      if (!username || !password) {
        return res.status(400).json({
          message: "Username and password are required",
        });
      }

      // Check if username already exists
      const existingUser = await User.findOne({
        where: { username },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }

      // Hash the password
      const hashedPassword = bcrypt.hash(password);

      // Create the user
      const newUser = await User.create({
        username,
        password: hashedPassword,
      });

      // Return user without password
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser.id,
          username: newUser.username,
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validate required fields
      if (!username || !password) {
        return res.status(400).json({
          message: "Username and password are required",
        });
      }

      // Find user by username
      const user = await User.findOne({
        where: { username },
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      // Compare passwords
      //   const isPasswordValid = bcrypt.compare(password, user.password);
      const isPasswordValid = (password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      // Generate JWT token
      const token = jwt.signToken({
        id: user.id,
        username: user.username,
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = UserController;
