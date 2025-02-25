const express = require("express");
const { addCategory, getCategories, deleteCategory } = require("../controllers/categoryController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Protect all category routes
router.use(authenticateToken);

// Category Routes
router.post("/api/categories", addCategory);  // Add a new category
router.get("/api/categories", getCategories); // Get all categories
router.delete("/api/categories/:id", deleteCategory); // Delete a category by ID

module.exports = router;
