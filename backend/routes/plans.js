const express = require("express");
const router = express.Router();
const WashingPlan = require("../models/WashingPlan"); // Import the WashingPlan schema

// Display Washing Plans
router.get("/plans", async (req, res) => {
  try {
    const plans = await WashingPlan.find();
    res.render("plans", { title: "Washing Plans", plans });
  } catch (error) {
    console.error("Error fetching washing plans:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
