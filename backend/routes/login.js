const express = require("express");
const router = express.Router();

// Login Page
router.get("/login", (req, res) => {
  res.render("login", { title: "Admin Login" });
});

// Handle Login Submission
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Example admin credentials (replace with database validation in production)
  const adminUser = {
    username: "admin",
    password: "password123",
  };

  if (username === adminUser.username && password === adminUser.password) {
    req.session.isAdmin = true;
    res.redirect("/admin"); // Redirect to admin dashboard after successful login
  } else {
    res.render("login", { title: "Admin Login", error: "Invalid credentials" });
  }
});

module.exports = router;
