const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); // Import the Contact schema

// Display Contact Page
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// Handle Form Submissions
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
    res.redirect("/contact");
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
