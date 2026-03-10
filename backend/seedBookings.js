const mongoose = require("mongoose");
const Booking = require("./models/Booking"); // Adjust the path if necessary

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/cwms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedBookings = async () => {
  try {
    // Clear existing data
    await Booking.deleteMany();

    // Add sample bookings
    await Booking.create([
      {
        customerName: "John Doe",
        carModel: "Toyota Corolla",
        washingPlan: "Basic Cleaning",
        date: new Date(),
        status: "Completed",
      },
      {
        customerName: "Jane Smith",
        carModel: "Honda Accord",
        washingPlan: "Premium Cleaning",
        date: new Date(),
        status: "Pending",
      },
    ]);

    console.log("Sample bookings added successfully.");
  } catch (error) {
    console.error("Error seeding bookings:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedBookings();
