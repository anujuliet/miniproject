const express = require("express");
const { register, login, logout, dashboard } = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();


// Authentication Actions
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/dashboard", authenticateToken, dashboard);

// API Routes (Use `/api/auth` for consistency)
router.post("/api/auth/register", register);
router.post("/api/auth/login", login);
router.post("/api/auth/logout", logout);
router.get("/api/auth/dashboard", authenticateToken, (req, res) => {
    res.json({ message: "Welcome to the dashboard", user: req.user });
});

module.exports = router;
