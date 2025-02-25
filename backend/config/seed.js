const Category = require("../models/Category");

const seedCategories = async () => {
    try {
        const defaultCategories = [
            { name: "Food", type: "expense", userId: null },
            { name: "Transport", type: "expense", userId: null },
            { name: "Entertainment", type: "expense", userId: null },
            { name: "Salary", type: "income", userId: null },
            { name: "Freelance", type: "income", userId: null }
        ];

        for (const category of defaultCategories) {
            await Category.findOrCreate({
                where: { name: category.name, type: category.type, userId: category.userId },
                defaults: category
            });
        }

        console.log("✅ Default categories seeded successfully.");
    } catch (err) {
        console.error("❌ Error seeding categories:", err.message);
    }
};

module.exports = seedCategories;
