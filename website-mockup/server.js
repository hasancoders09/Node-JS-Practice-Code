const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static CSS and JS from views folder
app.use("/style", express.static(path.join(__dirname, "views/style")));
app.use("/script", express.static(path.join(__dirname, "views/script")));

// Auth routes
app.use("/auth", authRoutes);

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home page
app.get("/", (req, res) => {
  res.render("index"); // if index.ejs is directly under /views
});

// Dynamic pages route
app.get("/pages/:page", (req, res, next) => {
  const page = req.params.page;
  res.render(`pages/${page}`, {}, (err, html) => {
    if (err) {
      console.error("❌ EJS render error:", err.message);
      return res.status(500).send(`<pre>${err.message}</pre>`);
    }
    res.send(html);
  });
});


// 404 fallback
app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
