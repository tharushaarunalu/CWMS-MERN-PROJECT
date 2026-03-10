const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Replace with the correct path to your Booking model

// Route to fetch all bookings
router.get('/all-booking', async (req, res) => {
    try {
        const bookings = await Booking.find(); // Fetch all bookings
        res.render('all_bookings', { bookings }); // Render the "all_bookings.ejs" view
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router; // Ensure the router is exported correctly
