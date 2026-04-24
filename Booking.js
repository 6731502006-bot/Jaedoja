const mongoose = require("mongoose");

module.exports = mongoose.model("Booking", {
  user: String,
  seat: String,
  zone: String,
  price: Number
});