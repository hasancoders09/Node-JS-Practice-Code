function adminAuth(req, res, next) {
  if (req.session && req.session.admin) {
    return next(); // admin is logged in
  }
  res.redirect("/admin/auth/login");
}

module.exports = adminAuth;
