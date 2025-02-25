const { Income } = require("../models");

// Add a new income
exports.addIncome = async (req, res) => {
    try {
        const { income_date, amount, categories_id } = req.body;
        const user_id = req.user.id; // Get user ID from token

        if (!income_date || !amount || !categories_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const income = await Income.create({
            income_date,
            amount,
            categories_id,
            user_id
        });

        if (req.headers["content-type"] === "application/json") {
            return res.status(201).json({ message: "Income added successfully", income });
        }

        res.redirect("/income");
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Error adding income", error: error.message });
    }
};

// Get all incomes for the logged-in user
exports.getIncomes = async (req, res) => {
    try {
        const user_id = req.user.id; // Get user ID from token
        const incomes = await Income.findAll({ where: { user_id } });

        if (req.headers["content-type"] === "application/json") {
            return res.status(200).json(incomes);
        }

        res.render("income", { incomes });
    } catch (error) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({ message: "Error fetching incomes", error: error.message });
    }
};

// Edit an income
exports.editIncome = async (req, res) => {
    try {
        const { income_id } = req.params;
        const { income_date, amount, categories_id } = req.body;
        const user_id = req.user.id; // Get user ID from token

        // Check if income exists and belongs to the user
        const income = await Income.findOne({ where: { income_id, user_id } });
        if (!income) {
            return res.status(404).json({ message: "Income not found or unauthorized" });
        }

        await income.update({ income_date, amount, categories_id });

        if (req.headers["content-type"] === "application/json") {
            return res.status(200).json({ message: "Income updated successfully", income });
        }

        res.redirect("/income");
    } catch (error) {
        console.error("Error updating income:", error);
        res.status(500).json({ message: "Error updating income", error: error.message });
    }
};

// Delete an income
exports.deleteIncome = async (req, res) => {
    try {
        const { income_id } = req.params;
        const user_id = req.user.id; // Get user ID from token

        // Check if income exists and belongs to the user
        const income = await Income.findOne({ where: { income_id, user_id } });
        if (!income) {
            return res.status(404).json({ message: "Income not found or unauthorized" });
        }

        await income.destroy();

        if (req.headers["content-type"] === "application/json") {
            return res.status(200).json({ message: "Income deleted successfully" });
        }

        res.redirect("/income");
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Error deleting income", error: error.message });
    }
};
