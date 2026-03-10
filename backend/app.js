require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const loginRoutes = require("./routes/login");
const geminiRoutes = require("./routes/geminiRoutes");
const cors = require('cors');
const apiBookings = require("./routes/apiBookings");



// Import Routes
const indexRoutes = require('./routes/index');
const aboutRoutes = require('./routes/about');
const contactRoutes = require('./routes/contact');
const plansRoutes = require('./routes/plans');
const locationRoutes = require('./routes/location');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require("./routes/booking");


// Initialize Express App
const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cwms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if the database connection fails
  });

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(bodyParser.json()); // Parse JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Set EJS as the Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API Routes
app.use("/api/bookings", apiBookings);

// EJS Routes
app.use('/', indexRoutes);
app.use('/', aboutRoutes);
app.use('/', contactRoutes);
app.use('/', plansRoutes);
app.use('/', locationRoutes);
app.use('/', adminRoutes);
app.use("/", loginRoutes);
app.use("/", bookingRoutes);
app.use("/", geminiRoutes); // Register the Gemini routes



// 404 Error Handling
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
