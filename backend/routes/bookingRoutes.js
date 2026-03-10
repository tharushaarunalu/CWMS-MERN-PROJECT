const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Ensure the Booking model is correctly imported

// Route for All Bookings
router.get('/all-bookings', async (req, res) => {
    try {
        // Fetch all bookings from the database
        const bookings = await Booking.find(); // Adjust query as needed

        // Render the all-bookings view and pass the bookings data
        res.render('all-bookings', { bookings });
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
