const express = require("express");
const router = express.Router();
const WashingPlan = require("../models/WashingPlan"); // Import the WashingPlan model
const Booking = require("../models/Booking");


// Render Booking Page for a Specific Plan
router.get("/book", async (req, res) => {
  const { plan } = req.query; // Extract the plan name from the query parameter

  if (!plan) {
    return res.redirect("/plans"); // Redirect to the plans page if no plan is specified
  }

  try {
    // Fetch the selected washing plan details from the database
    const selectedPlan = await WashingPlan.findOne({ name: plan });

    if (!selectedPlan) {
      return res.redirect("/plans"); // Redirect if the plan does not exist
    }

    res.render("book", {
      title: `Book ${selectedPlan.name}`,
      plan: selectedPlan, // Pass the plan details to the EJS template
    });
  } catch (error) {
    console.error("Error fetching plan details:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle Booking Form Submission
router.post("/book/confirm", async (req, res) => {
  try {
    const { package, washingPoint, fullName, mobileNo, washDate, washTime, message } = req.body;

    // Save the booking to the database
    await Booking.create({
      packageType: package,
      washingPoint,
      fullName,
      mobileNo,
      washDate,
      washTime,
      message,
      status: "Pending",
    });

    res.redirect("/plans"); // Redirect to plans page after booking
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Render Appointment Booking Page
router.get("/book", async (req, res) => {
  try {
    // Fetch all available washing plans from the database
    const washingPlans = await WashingPlan.find();

    res.render("appointment", {
      title: "Get Appointment",
      washingPlans,
    });
  } catch (error) {
    console.error("Error fetching washing plans:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
