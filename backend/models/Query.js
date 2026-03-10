const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  question: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Query || mongoose.model("Query", querySchema);
