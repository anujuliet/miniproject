const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // Assuming you have a User model in Sequelize
require("dotenv").config();

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h" } // Token valid for 1 hour
    );
};

// User Registration
const register = async (req, res) => {
    try {
        const { email, password, username, accountType, gender } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
            accountType,
            gender,
        });

        // Generate token
        const token = generateToken(newUser);
        res.status(201).json({ message: "Registration successful", token });

    } catch (error) {
        console.error("Registration Error:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate token
        const token = generateToken(user);
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// User Logout (Handled on Frontend)
const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Dashboard (Protected Route)
const dashboard = async (req, res) => {
    try {
        res.status(200).json({ message: "Welcome to your dashboard", user: req.user });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

module.exports = { register, login, logout, dashboard };
