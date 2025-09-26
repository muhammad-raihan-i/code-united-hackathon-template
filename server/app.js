require("dotenv").config;
const express = require("express");
const UserController = require("./controllers/UserController");
const PaletteController = require("./controllers/PaletteController");
const jwt = require("./helpers/jwt");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Example route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, Express!" });
});

// Authentication middleware
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header required" });
    }

    const token = authHeader.split(" ")[1]; // Bearer token
    if (!token) {
      return res.status(401).json({ message: "Token required" });
    }

    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

//write all the routes here
// User routes
app.post("/register", UserController.register);
app.post("/login", UserController.login);

// Palette routes (protected)
app.post("/palettes", authenticate, PaletteController.create);
app.get("/palettes", authenticate, PaletteController.getAll);
app.get("/palettes/:id", authenticate, PaletteController.getById);
app.put("/palettes/:id", authenticate, PaletteController.update);
app.delete("/palettes/:id", authenticate, PaletteController.delete);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;
