const Category = require("../models/Category");

const defaultCategories = [
    { name: "Food", type: "expense", userId: null },
    { name: "Rent", type: "expense", userId: null },
    { name: "Salary", type: "income", userId: null },
];

const seedCategories = async () => {
    try {
        for (const category of defaultCategories) {
            const exists = await Category.findOne({
                where: { name: category.name, type: category.type, userId: null }
            });
            if (!exists) {
                await Category.create(category);
                console.log(`✅ Seeded: ${category.name} (${category.type})`);
            }
        }
        console.log("✅ Default categories seeded successfully!");
    } catch (error) {
        console.error("❌ Error seeding categories:", error);
    }
};

module.exports = seedCategories;
