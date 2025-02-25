const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

// Use DATABASE_URL for Heroku or production
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: process.env.DB_SSL === "true" 
            ? { ssl: { require: true, rejectUnauthorized: false } } 
            : {},
        logging: process.env.DB_LOGGING === "true" ? console.log : false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    });
} else {
    // Ensure all required local environment variables exist
    const requiredEnvVars = ["DB_NAME", "DB_USER", "DB_PASS", "DB_HOST", "DB_PORT"];
    requiredEnvVars.forEach((varName) => {
        if (!process.env[varName]) {
            console.error(`❌ Missing required environment variable: ${varName}`);
            process.exit(1);
        }
    });

    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432, // Default PostgreSQL port
        dialect: process.env.DB_DIALECT || "postgres",
        logging: process.env.DB_LOGGING === "true" ? console.log : false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    });
}

// Test connection
sequelize
    .authenticate()
    .then(() => console.log("✅ Database connected successfully."))
    .catch((err) => {
        console.error("❌ Database connection error:", err.message);
        process.exit(1);
    });

module.exports = sequelize;
