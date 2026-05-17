const detectSwings =
  require("../market/swingDetector");

exports.getSwings = (req, res) => {
  try {
    const symbol =
      req.query.symbol || "BTCUSDT";

    const timeframe =
      req.query.timeframe || "1m";

    const swings = detectSwings(
      symbol,
      timeframe
    );

    res.json({
      success: true,
      symbol,
      timeframe,
      swings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};