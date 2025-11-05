const Post = require("../models/postModel");

exports.getPostsPage = (req, res) => {
  Post.getAll((err, results) => {
    if (err) return res.send("❌ Failed to load posts");
    res.render("admin/posts", { title: "Manage Posts", admin: req.session.admin, posts: results });
  });
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const author_id = req.session.admin.id;

  if (!title || !content) return res.send("❌ Title and content required");

  Post.create(title, content, author_id, (err) => {
    if (err) return res.send("❌ Failed to create post");
    res.redirect("/administrator/posts");
  });
};
