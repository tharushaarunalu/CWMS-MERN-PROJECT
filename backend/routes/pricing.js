const express = require('express');
const router = express.Router();

// Define route for the pricing page
router.get('/', (req, res) => {
  res.render('pricing');  // Renders the pricing.ejs file
});

module.exports = router;  // Export the router instance
