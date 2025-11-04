const db = require("../models/db");
const bcrypt = require("bcrypt");  // for password hashing

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send("❌ All fields are required");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert into database
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.send("❌ Email already registered");
      }
      return res.send("❌ Registration failed");
    }
    res.send(`✅ User ${name} registered successfully!`);
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send("❌ All fields required");

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.send("❌ Login failed");

    if (results.length === 0) return res.send("❌ User not found");

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("❌ Invalid password");

    res.send(`✅ Login successful! Welcome ${user.name}`);
  });
};