const mongoose =
  require("mongoose");

const SwingSchema =
  new mongoose.Schema({
    symbol: String,

    timeframe: String,

    type: String,

    price: Number,

    timestamp: Number,
  });

module.exports =
  mongoose.model(
    "Swing",
    SwingSchema
  );