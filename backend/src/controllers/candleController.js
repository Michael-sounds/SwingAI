const {
  getCandles,
} = require("../market/candleStore");

exports.getCandles = (req, res) => {
  try {
    const symbol =
      req.query.symbol || "BTCUSDT";

    const timeframe =
      req.query.timeframe || "1m";

    const candles =
      getCandles(symbol, timeframe);

    res.json({
      success: true,
      symbol,
      timeframe,
      count: candles.length,
      candles,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};