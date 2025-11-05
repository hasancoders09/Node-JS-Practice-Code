const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const adminAuth = require("../middleware/adminAuth");
const projectController = require("../controllers/projectController");
const categoryController = require("../controllers/categoryController");
const multer = require("multer");

// Ensure upload folder exists
const uploadDir = path.join(__dirname, "..", "uploads", "projects");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Dashboard
router.get("/dashboard", adminAuth, (req, res) =>
  res.render("admin/dashboard", { title: "Admin Dashboard", admin: req.session.admin })
);

// Projects
router.get("/projects", adminAuth, projectController.getProjectsPage);
router.post("/projects", adminAuth, upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "gallery", maxCount: 10 }]), projectController.createProject);
router.post("/projects/edit/:id", adminAuth, upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "gallery", maxCount: 10 }]), projectController.editProject);
router.post("/projects/delete/:id", adminAuth, projectController.deleteProject);

// Categories
router.post("/categories/add", adminAuth, categoryController.addCategory);

module.exports = router;
