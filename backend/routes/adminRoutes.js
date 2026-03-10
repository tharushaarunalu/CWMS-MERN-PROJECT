const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // Import the Booking schema
const WashingPlan = require("../models/WashingPlan");
const Contact = require("../models/Contact");
const WashingPoint = require("../models/WashingPoint"); // Import the WashingPoint model
const Enquiry = require("../models/Enquiry");
const Query = require("../models/Query"); // Create a model to store queries
const axios = require("axios");

// Middleware for Admin Authentication (placeholder, replace with actual logic)
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    next();
  } else {
    res.redirect("/login"); // Redirect to login if not authenticated
  }
};
// Admin Dashboard

// Admin Dashboard Route
router.get("/admin", async (req, res) => {
  try {
    // Fetch counts dynamically
    const totalBookings = await Booking.countDocuments();
    const newBookings = await Booking.countDocuments({ status: "Pending" });
    const completedBookings = await Booking.countDocuments({ status: "Completed" });
    const enquiries = await Enquiry.countDocuments();
    const washingPoints = await WashingPoint.countDocuments();

     // Render admin dashboard with dynamic data
    // Pass data to the template, including 'title'
    res.render("adminDashboard", {
      title: "Admin Dashboard", // Add the title explicitly here
      totalBookings,
      newBookings,
      completedBookings,
      enquiries,
      washingPoints,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Manage Washing Points Route
router.get("/admin/manage-washingpoints", isAuthenticated, async (req, res) => {
  try {
    const washingPoints = await WashingPoint.find(); // Fetch all washing points
    res.render("manage-washingpoints", {
      title: "Manage Washing Points",
      washingPoints, // Pass washingPoints to the template
    });
  } catch (error) {
    console.error("Error fetching washing points:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Admin View All Bookings
router.get("/admin/all-bookings", isAuthenticated, async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.render("all_bookings", { title: "All Bookings", bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/admin/add-washingpoint", isAuthenticated, (req, res) => {
  res.render("add-washingpoint", { title: "Add Washing Point" });
});

router.post("/admin/add-washingpoint", isAuthenticated, async (req, res) => {
  try {
    const { name, location, contact, servicesAvailable } = req.body;
    await WashingPoint.create({ name, location, contact, servicesAvailable: servicesAvailable.split(",") });
    res.redirect("/admin/manage-washingpoints");
  } catch (error) {
    console.error("Error adding washing point:", error);
    res.status(500).send("Internal Server Error");
  }
});


//edit washing point

router.get("/admin/edit-washingpoint/:id", isAuthenticated, async (req, res) => {
  const washingPoint = await WashingPoint.findById(req.params.id);
  res.render("edit-washingpoint", { title: "Edit Washing Point", washingPoint });
});

router.post("/admin/edit-washingpoint/:id", isAuthenticated, async (req, res) => {
  try {
    const { name, location, contact, servicesAvailable } = req.body;
    await WashingPoint.findByIdAndUpdate(req.params.id, { name, location, contact, servicesAvailable: servicesAvailable.split(",") });
    res.redirect("/admin/manage-washingpoints");
  } catch (error) {
    console.error("Error editing washing point:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Edit Washing Point

router.get("/admin/delete-washingpoint/:id", isAuthenticated, async (req, res) => {
  try {
    await WashingPoint.findByIdAndDelete(req.params.id);
    res.redirect("/admin/manage-washingpoints");
  } catch (error) {
    console.error("Error deleting washing point:", error);
    res.status(500).send("Internal Server Error");
  }
});


//



// Handle Adding Car Wash Booking
router.post("/admin/add-booking", async (req, res) => {
  const { packageType, washingPoint, fullName, mobileNo, washDate, washTime, message } = req.body;

  try {
    // Log incoming data to check if it's correct
    console.log("Form Data:", req.body);

    // Save the booking to the database
    await Booking.create({
      packageType,
      washingPoint,
      fullName,
      mobileNo,
      washDate,
      washTime,
      message,
      status: "Pending",
    });

    console.log("Booking added successfully");
    res.redirect("/admin");
  } catch (error) {
    console.error("Error adding booking:", error.message); // Log the error message
    res.status(500).send(`Error occurred while adding booking: ${error.message}`);
  }
});

// Print Bill
router.get("/admin/print_bill/:id", isAuthenticated, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    res.render("print_bill", { title: "Print Bill", booking });
  } catch (error) {
    console.error("Error generating bill:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
// Take Action on Booking
router.post("/admin/take-action/:id", isAuthenticated, async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: "Completed" });
    res.redirect("/admin/all-bookings");
  } catch (error) {
    console.error("Error taking action:", error);
    res.status(500).send("Error while taking action on the booking.");
  }
});

// Contact Form Submission
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Enquiry.create({ name, email, message, status: "Unread" });
    res.redirect("/contact?success=1"); // Redirect to success
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    res.status(500).send("Failed to submit enquiry.");
  }
});

// Admin Dashboard - Total Enquiries Count
router.get("/admin", isAuthenticated, async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const newBookings = await Booking.countDocuments({ status: "Pending" });
    const completedBookings = await Booking.countDocuments({ status: "Completed" });
    const enquiries = await Enquiry.countDocuments({ status: "Unread" }); // Count unread enquiries
    res.render("adminDashboard", {
      title: "Admin Dashboard",
      totalBookings,
      newBookings,
      completedBookings,
      enquiries,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// View Enquiries Route
router.get("/enquiries", isAuthenticated, async (req, res) => {
  try {
    const enquiries = await Enquiry.find(); // Fetch all enquiries
    res.render("view-enquiries", { title: "View Enquiries", enquiries });
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).send("Failed to load enquiries.");
  }
});

// Mark Enquiry as Read
router.post("/admin/enquiries/mark-read/:id", isAuthenticated, async (req, res) => {
  try {
    await Enquiry.findByIdAndUpdate(req.params.id, { status: "Read" });
    res.redirect("/admin/enquiries");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to mark enquiry as read.");
  }
});

// GET Route to render the Edit Booking page
router.get("/admin/edit-booking/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    res.render("edit-booking", { title: "Edit Booking", booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST Route to update the booking
router.post("/admin/edit-booking/:id", async (req, res) => {
  try {
    const { packageType, washingPoint, fullName, mobileNo, washDate, washTime, message } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        packageType,
        washingPoint,
        fullName,
        mobileNo,
        washDate,
        washTime,
        message,
      },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).send("Booking not found");
    }
    res.redirect("/admin/all-bookings");
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Delete Booking Route
router.post('/admin/delete-booking/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id); // Ensure the ID is valid and matches the schema
    res.redirect('/admin/all-bookings'); // Redirect to the bookings page after deletion
  } catch (error) {
    console.error('Error deleting booking:', error.message);
    res.status(500).send('Error deleting booking.');
  }
});

router.get("/admin/search-bookings", async (req, res) => {
  const { mobileNo } = req.query;
  try {
    console.log("Searching for mobileNo:", mobileNo); // Log the input
    const bookings = await Booking.find({ mobileNo: mobileNo.trim() }); // Use trim() to remove extra spaces
    console.log("Bookings found:", bookings); // Log the results
    res.render("search_results", { bookings });
  } catch (error) {
    console.error("Error searching bookings:", error);
    res.status(500).send("Internal Server Error");
  }
});




// Admin Logout
router.get("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
