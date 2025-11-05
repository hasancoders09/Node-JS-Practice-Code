const express = require("express");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const Post = require("./models/postModel");
const Project = require("./models/projectModel");
const loadProjects = require("./middleware/loadProjects"); // new

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({ secret: "supersecretkey", resave: false, saveUninitialized: false }));

// Static files
app.use("/style", express.static(path.join(__dirname, "views/style")));
app.use("/script", express.static(path.join(__dirname, "views/script")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Load projects on all pages
app.use(loadProjects);

// Routes
app.use("/auth", authRoutes);
app.use("/admin/auth", adminAuthRoutes);
app.use("/administrator", adminRoutes);

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home page
app.get("/", (req, res) => res.render("index", { title: "Home" }));

// Posts page
app.get("/pages/posts", (req, res) =>
  Post.getAll((err, posts) => {
    if (err) return res.render("pages/posts", { title: "All Blog Posts", posts: [] });
    res.render("pages/posts", { title: "All Blog Posts", posts: posts || [] });
  })
);

// Project detail page
app.get("/pages/projects/:slug", (req, res) =>
  Project.getBySlug(req.params.slug, (err, results) => {
    if (err || results.length === 0) return res.status(404).send("Project not found");
    const project = results[0];
    project.gallery = project.gallery ? project.gallery.split(",") : [];
    res.render("pages/project-detail", { title: project.title, project });
  })
);

// Dynamic pages
app.get("/pages/:page", (req, res) => {
  const page = req.params.page;
  res.render(`pages/${page}`, { title: page }, (err, html) => {
    if (err) return res.status(500).send(`<pre>${err.message}</pre>`);
    res.send(html);
  });
});

// 404
app.use((req, res) => res.status(404).send("<h1>404 - Page Not Found</h1>"));

// Start
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
