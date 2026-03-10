const mongoose = require("mongoose");
const WashingPlan = require("./models/WashingPlan"); // Adjust path if needed

mongoose.connect("mongodb://localhost:27017/cwms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedPlans = async () => {
  try {
    console.log("Seeding washing plans...");

    // Clear existing data
    await WashingPlan.deleteMany();

    // Insert the sample plans
    await WashingPlan.insertMany([
      {
        name: "Basic Cleaning",
        price: 10.99,
        services: ["Seats Washing", "Vacuum Cleaning", "Exterior Cleaning"],
      },
      {
        name: "Premium Cleaning",
        price: 20.99,
        services: [
          "Seats Washing",
          "Vacuum Cleaning",
          "Exterior Cleaning",
          "Interior Wet Cleaning",
        ],
      },
      {
        name: "Complex Cleaning",
        price: 30.99,
        services: [
          "Seats Washing",
          "Vacuum Cleaning",
          "Exterior Cleaning",
          "Interior Wet Cleaning",
          "Window Cleaning",
        ],
      },
    ]);

    console.log("Washing plans seeded successfully!");
  } catch (error) {
    console.error("Error seeding washing plans:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedPlans();
