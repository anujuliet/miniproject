const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Category = require("./Category");

const Expense = sequelize.define("Expense", {
    expense_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    expense_date: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")  // More efficient
    },
    amount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
        validate: { min: 0 }  // Prevents negative values
    }
});

// Define Foreign Keys with Proper Naming
Expense.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
Expense.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE" });

module.exports = Expense;
