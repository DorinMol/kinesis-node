const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  type: String,
  timestamp: Number,
  value: Number,
});

module.exports = mongoose.model("eventLog", eventSchema);
