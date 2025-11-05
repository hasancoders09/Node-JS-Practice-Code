exports.dashboard = (req, res) => {
  res.render("admin/dashboard", { title: "Administrator Dashboard" });
};

exports.posts = (req, res) => {
  res.render("admin/posts", { title: "Manage Posts" });
};

exports.projects = (req, res) => {
  res.render("admin/projects", { title: "Manage Projects" });
};
