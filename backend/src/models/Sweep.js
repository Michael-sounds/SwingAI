const mongoose =
  require("mongoose");

const SweepSchema =
  new mongoose.Schema({
    symbol: String,

    timeframe: String,

    type: String,

    sweptPrice: Number,

    timestamp: Number,
  });

module.exports =
  mongoose.model(
    "Sweep",
    SweepSchema
  );