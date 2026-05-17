const mongoose =
  require("mongoose");

const CandleSchema =
  new mongoose.Schema({
    symbol: String,

    timeframe: String,

    open: Number,

    high: Number,

    low: Number,

    close: Number,

    volume: Number,

    timestamp: Number,

    source: String,
  });

module.exports =
  mongoose.model(
    "Candle",
    CandleSchema
  );