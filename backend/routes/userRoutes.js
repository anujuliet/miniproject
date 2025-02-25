const express = require("express");
const { register, login, logout, getUserProfile } = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Test route
router.get("/", (req, res) => res.send("User Routes Working!"));

// Authentication routes
router.post("/register", register); // Register a new user
router.post("/login", login); // User login
router.post("/logout", logout); // User logout

// Protected route: Get user profile
router.get("/profile", authenticateToken, getUserProfile);

module.exports = router;
