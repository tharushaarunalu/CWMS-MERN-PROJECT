const mongoose = require("mongoose");

const washingPointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  servicesAvailable: [String], // List of available services
});

module.exports = mongoose.model("WashingPoint", washingPointSchema);
