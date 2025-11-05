const db = require("./db");

// Insert new admin
exports.createAdmin = (name, email, hashedPassword, callback) => {
  const query = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, hashedPassword], callback);
};

// Find admin by email
exports.findAdminByEmail = (email, callback) => {
  const query = "SELECT * FROM admins WHERE email = ?";
  db.query(query, [email], callback);
};
