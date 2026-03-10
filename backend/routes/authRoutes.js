const express = require('express');
const router = express.Router();

// Hardcoded default admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123';

// Render the login page
router.get('/login', (req, res) => {
    res.render('login'); // Ensure login.ejs exists in the `views` folder
});

// Handle login submission
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Successful login, redirect to adminDashboard
        return res.redirect('/admin/adminDashboard');
    } else {
        // Invalid credentials, redirect back to login with an error message
        return res.render('login', { error: 'Invalid username or password' });
    }
});

module.exports = router;
