const express = require("express");
const router = express.Router();
const WashingPoint = require("../models/WashingPoint"); // Import the WashingPoint model


// Mock Data for Locations
const locations = [
  { name: "Downtown Car Wash", address: "123 Main Street, New York, NY" },
  { name: "Suburban Wash Center", address: "456 Elm Street, Brooklyn, NY" },
  { name: "Highway Quick Wash", address: "789 Highway Road, Queens, NY" },
];

// Display Service Locations
router.get("/location", (req, res) => {
  res.render("location", { title: "Our Locations", locations });
});

// Render Washing Points Page
router.get("/points", async (req, res) => {
  try {
    // Fetch all washing points from the database
    const washingPoints = await WashingPoint.find();
    res.render("points", {
      title: "Our Washing Points",
      washingPoints,
    });
  } catch (error) {
    console.error("Error fetching washing points:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
