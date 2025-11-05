const Project = require("../models/projectModel");

module.exports = (req, res, next) => {
  Project.getAll((err, projects) => {
    if (err) {
      console.error("❌ Failed to load projects:", err);
      res.locals.projects = [];
    } else {
      res.locals.projects = projects || [];
    }
    next();
  });
};
