const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Category = require("./Category");

const Income = sequelize.define("Income", {
    income_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    income_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,  // Sets current date if not provided
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    freezeTableName: true,  // Prevents Sequelize from pluralizing table names
    timestamps: true,  // Adds createdAt and updatedAt fields automatically
});

// Associations
Income.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
Income.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE" });

module.exports = Income;
