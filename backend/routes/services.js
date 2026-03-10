const express = require('express');
const router = express.Router();

// Define route for the services page
router.get('/', (req, res) => {
  res.render('services');  // Renders the services.ejs file
});

module.exports = router;  // Export the router instance
