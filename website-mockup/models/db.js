const mysql = require("mysql2");

// Connect to MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",       // change if your DB user is different
  password: "",       // change if your DB password is set
  database: "db_codecraft"
});

// Connect
connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to db_codecraft");

  // Create "users" table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  connection.query(createTableQuery, (err) => {
    if (err) console.error("❌ Error creating table:", err);
    else console.log("✅ Table 'users' ready");
  });
});

module.exports = connection;
