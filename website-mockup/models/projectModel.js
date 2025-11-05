const db = require("./db");

exports.create = (author_id, title, slug, description, thumbnail, gallery, category_id, callback) => {
  db.query(
    "INSERT INTO projects (author_id, title, slug, description, thumbnail, gallery, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [author_id, title, slug, description, thumbnail, gallery, category_id],
    callback
  );
};

exports.getAll = (callback) => {
  db.query(
    `SELECT projects.*, categories.name AS category_name
     FROM projects LEFT JOIN categories ON projects.category_id = categories.id
     ORDER BY projects.created_at DESC`,
    callback
  );
};

exports.getById = (id, callback) => {
  db.query("SELECT * FROM projects WHERE id = ?", [id], callback);
};

// 🆕 FIX — Added this function for project-details page
exports.getBySlug = (slug, callback) => {
  db.query(
    `SELECT projects.*, categories.name AS category_name
     FROM projects
     LEFT JOIN categories ON projects.category_id = categories.id
     WHERE projects.slug = ? LIMIT 1`,
    [slug],
    callback
  );
};

exports.update = (id, title, description, thumbnail, gallery, category_id, status, callback) => {
  db.query(
    `UPDATE projects SET title=?, description=?, thumbnail=?, gallery=?, category_id=?, status=? WHERE id=?`,
    [title, description, thumbnail, gallery, category_id, status, id],
    callback
  );
};

exports.delete = (id, callback) => {
  db.query("DELETE FROM projects WHERE id=?", [id], callback);
};
