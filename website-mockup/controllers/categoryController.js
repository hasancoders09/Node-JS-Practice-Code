const Category = require("../models/categoryModel");

exports.addCategory = (req, res) => {
  const { name } = req.body;
  Category.create(name, (err) => {
    if (err) return res.status(500).send("Error adding category");
    res.redirect("/administrator/projects");
  });
};
