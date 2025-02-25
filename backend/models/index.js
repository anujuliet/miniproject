const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user");
const Category = require("./category");
const Expense = require("./expense");
const Income = require("./income");


// Define Associations
User.hasMany(Expense, { foreignKey: "id" });
User.hasMany(Income, { foreignKey: "id" });

Category.hasMany(Expense, { foreignKey: "categories_id" });
Category.hasMany(Income, { foreignKey: "categories_id" });

Expense.belongsTo(User, { foreignKey: "id" });
Expense.belongsTo(Category, { foreignKey: "categories_id" });

Income.belongsTo(User, { foreignKey: "id" });
Income.belongsTo(Category, { foreignKey: "categories_id" });
sequelize
    .sync({ alter: true }) // Use { force: true } to drop and re-create tables
    .then(() => console.log("✅ Database synced successfully."))
    .catch((err) => console.error("❌ Database sync error:", err));

module.exports = { sequelize, User, Category, Expense, Income };
