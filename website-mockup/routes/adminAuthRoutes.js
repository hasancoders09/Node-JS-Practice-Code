const express = require("express");
const { registerAdmin, loginAdmin, logoutAdmin } = require("../controllers/adminAuthController");

const router = express.Router();

router.get("/login", (req, res) => res.render("admin/login", { title: "Admin Login" }));
router.get("/register", (req, res) => res.render("admin/register", { title: "Admin Registration" }));


router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.get("/logout", logoutAdmin);

module.exports = router;
