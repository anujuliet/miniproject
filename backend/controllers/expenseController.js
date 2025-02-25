const { Expense } = require("../models");

// Add a new expense
exports.addExpense = async (req, res) => {
    try {
        const { expense_date, amount, categories_id } = req.body;
        const user_id = req.user.id; // Get user ID from token

        if (!expense_date || !amount || !categories_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const expense = await Expense.create({
            expense_date,
            amount,
            user_id,
            categories_id
        });

        res.status(201).json({ message: "Expense added successfully", expense });
    } catch (err) {
        console.error("Error adding expense:", err);
        res.status(500).json({ message: "Error adding expense", error: err.message });
    }
};

// Get all expenses for the logged-in user
exports.getExpenses = async (req, res) => {
    try {
        const user_id = req.user.id; // Get user ID from token
        const expenses = await Expense.findAll({ where: { user_id } });

        res.status(200).json(expenses);
    } catch (err) {
        console.error("Error fetching expenses:", err);
        res.status(500).json({ message: "Error fetching expenses", error: err.message });
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id; // Get user ID from token

        // Check if expense exists and belongs to user
        const expense = await Expense.findOne({ where: { expense_id: id, user_id } });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found or unauthorized" });
        }

        // Delete expense
        await expense.destroy();
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (err) {
        console.error("Error deleting expense:", err);
        res.status(500).json({ message: "Error deleting expense", error: err.message });
    }
};
