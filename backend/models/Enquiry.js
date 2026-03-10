const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["Unread", "Read"], default: "Unread" },
  createdAt: { type: Date, default: Date.now },
});

// Avoid OverwriteModelError by checking if model exists
module.exports = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
