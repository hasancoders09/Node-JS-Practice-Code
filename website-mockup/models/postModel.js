const db = require("./db");

// Create post
exports.create = (title, content, author_id, callback) => {
  const query = `
    INSERT INTO posts (title, content, author_id)
    VALUES (?, ?, ?)
  `;
  db.query(query, [title, content, author_id], (err, results) => {
    if (err) {
      console.error("❌ Error creating post:", err);
      return callback(err);
    }
    callback(null, results);
  });
};

// Get all posts
exports.getAll = (callback) => {
  const query = `
    SELECT p.id, p.title, p.content, p.created_at,
           a.name AS author
    FROM posts p
    LEFT JOIN admins a ON p.author_id = a.id
    ORDER BY p.id DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching posts:", err);
      return callback(err);
    }
    console.log("✅ Posts fetched:", results.length);
    callback(null, results);
  });
};

// Get single post
exports.getById = (id, callback) => {
  const query = "SELECT * FROM posts WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching post by ID:", err);
      return callback(err);
    }
    callback(null, results[0]);
  });
};
