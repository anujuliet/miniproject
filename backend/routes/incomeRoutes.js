const express = require("express");
const { Income, Category } = require("../models");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Protect all income routes
router.use(authenticateToken);

// Add Income
router.post("/add", async (req, res) => {
    const { amount, category_id } = req.body;

    try {
        const income = await Income.create({
            amount,
            categories_id: category_id,
            income_date: new Date(),
        });
        res.status(201).json({ message: "Income added successfully", income });
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Error adding income", error: error.message });
    }
});

// Get Incomes
router.get("/", async (req, res) => {
    try {
        const incomes = await Income.findAll({
            include: [{ model: Category, attributes: ["categories_name"] }],
        });
        res.status(200).json(incomes);
    } catch (error) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({ message: "Error fetching incomes", error: error.message });
    }
});

module.exports = router;
