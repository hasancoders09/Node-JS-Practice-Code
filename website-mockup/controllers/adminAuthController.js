const db = require("../models/db");
const bcrypt = require("bcrypt");

// Admin Registration
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.send("❌ All fields required");

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, hashedPassword], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") return res.send("❌ Email already registered");
      return res.send("❌ Registration failed");
    }
    res.send(`✅ Admin ${name} registered successfully!`);
  });
};

// Admin Login
exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send("❌ All fields required");

  const query = "SELECT * FROM admins WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.send("❌ Login failed");

    if (results.length === 0) return res.send("❌ Admin not found");

    const admin = results[0];
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.send("❌ Invalid password");

    // ✅ Save admin session
    req.session.admin = { id: admin.id, name: admin.name, email: admin.email };
    res.redirect("/administrator/dashboard");
  });
};

// Admin Logout
exports.logoutAdmin = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/auth/login");
  });
};
