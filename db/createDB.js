require("dotenv").config(); // Load environment variables from .env file
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");

// Configuration for your MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Read the schema SQL file
const schemaPath = path.join(__dirname, "schema.sql");
const schemaSQL = fs.readFileSync(schemaPath, "utf8");
const statements = schemaSQL.split(";").map((statement) => statement.trim());

// Function to execute each SQL statement
const executeStatements = async () => {
  for (const statement of statements) {
    if (statement) {
      await executeStatement(statement);
    }
  }
};

// Function to execute a single SQL statement
const executeStatement = (statement) => {
  return new Promise((resolve, reject) => {
    connection.query(statement, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Connect to MySQL and run the schema SQL
connection.connect(async (err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");
  try {
    await executeStatements();
    console.log("Schema SQL executed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error executing schema SQL:", error);
    process.exit(1);
  }
});
