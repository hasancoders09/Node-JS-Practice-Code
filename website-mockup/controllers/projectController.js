const Project = require("../models/projectModel");
const Category = require("../models/categoryModel");
const slugify = require("slugify");

// Show admin projects page
exports.getProjectsPage = (req, res) => {
  Category.getAll((err, categories) => {
    if (err) categories = [];
    Project.getAll((err, projects) => {
      if (err) projects = [];
      res.render("admin/projects", { title: "Manage Projects", projects, categories });
    });
  });
};

// Create new project
exports.createProject = (req, res) => {
  const { title, description, category_id } = req.body;
  const thumbnail = req.files.thumbnail ? req.files.thumbnail[0].filename : null;
  const gallery = req.files.gallery ? req.files.gallery.map(f => f.filename).join(",") : null;

  const slug = slugify(title, { lower: true, strict: true });
  const author_id = 1; // Replace with logged-in admin ID

  Project.create(author_id, title, slug, description, thumbnail, gallery, category_id, (err) => {
    if (err) return res.status(500).send("Error creating project");
    res.redirect("/administrator/projects");
  });
};

// Edit project
exports.editProject = (req, res) => {
  const { title, description, category_id, status } = req.body;
  const id = req.params.id;
  const thumbnail = req.files.thumbnail ? req.files.thumbnail[0].filename : null;
  const gallery = req.files.gallery ? req.files.gallery.map(f => f.filename).join(",") : null;

  Project.update(id, title, description, thumbnail, gallery, category_id, status, (err) => {
    if (err) return res.status(500).send("Error updating project");
    res.redirect("/administrator/projects");
  });
};

// Delete project
exports.deleteProject = (req, res) => {
  const id = req.params.id;
  Project.delete(id, (err) => {
    if (err) return res.status(500).send("Error deleting project");
    res.redirect("/administrator/projects");
  });
};
