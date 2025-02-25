const { Category, Expense, Income } = require("../models");

// Add a new category
exports.addCategory = async (req, res) => {
    try {
        const { categories_name } = req.body;

        // Validate input
        if (!categories_name || categories_name.trim() === "") {
            return res.status(400).json({ message: "Category name cannot be empty" });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ where: { categories_name: categories_name.trim() } });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        // Create category
        const category = await Category.create({ categories_name: categories_name.trim() });
        res.status(201).json({ message: "Category added successfully", category });
    } catch (err) {
        console.error("Error adding category:", err);
        res.status(500).json({ message: "Error adding category", error: err.message });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ message: "Error fetching categories", error: err.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if category exists
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Check if category is linked to any expenses or incomes
        const expenseCount = await Expense.count({ where: { categories_id: id } });
        const incomeCount = await Income.count({ where: { categories_id: id } });

        if (expenseCount > 0 || incomeCount > 0) {
            return res.status(400).json({ message: "Cannot delete category with associated expenses or incomes" });
        }

        // Delete category
        await category.destroy();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json({ message: "Error deleting category", error: err.message });
    }
};
