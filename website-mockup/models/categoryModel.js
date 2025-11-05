const db = require("./db");

const Category = {};

// Get all categories
Category.getAll = (callback) => {
  db.query("SELECT * FROM categories ORDER BY name ASC", (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Get category by ID
Category.getById = (id, callback) => {
  db.query("SELECT * FROM categories WHERE id = ?", [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Export
module.exports = Category;
