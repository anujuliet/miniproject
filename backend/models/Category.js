const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define("Category", {
    category_id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {  
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [2, 50] }  
    },
    type: {  
        type: DataTypes.ENUM("expense", "income"),
        allowNull: false
    },
    userId: {  
        type: DataTypes.INTEGER,
        allowNull: true, // NULL = Global category, otherwise user-specific
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE"
    }
}, {
    freezeTableName: true,
    timestamps: false  
});

module.exports = Category;
