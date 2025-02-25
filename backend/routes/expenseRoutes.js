const express = require("express");
const { Expense, Category } = require("../models");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Protect all expense routes
router.use(authenticateToken);

// Add Expense
router.post("/add", async (req, res) => {
    try {
        const { expense_date, amount, category_id } = req.body;
        const user_id = req.user.id; // Get user ID from token

        const expense = await Expense.create({
            expense_date: expense_date || new Date(), // Default to current date
            amount,
            user_id, // Use correct foreign key
            categories_id: category_id, // Ensure correct key name
        });

        res.status(201).json({ message: "Expense added successfully", expense });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Error adding expense", error: error.message });
    }
});

// Get Expenses for the logged-in user
router.get("/", async (req, res) => {
    try {
        const user_id = req.user.id; // Get user ID from token

        const expenses = await Expense.findAll({
            where: { user_id }, // Use correct foreign key
            include: [{ model: Category, attributes: ["category_name"] }], // Ensure correct attribute name
        });

        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Error fetching expenses", error: error.message });
    }
});

// Delete Expense
router.delete("/:expense_id", async (req, res) => {
    try {
        const { expense_id } = req.params;
        const user_id = req.user.id; // Get user ID from token

        const expense = await Expense.findOne({ where: { expense_id, user_id } });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        await expense.destroy();
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Error deleting expense", error: error.message });
    }
});

module.exports = router;
