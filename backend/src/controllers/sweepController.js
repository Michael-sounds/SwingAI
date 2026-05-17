const detectSweeps =
  require("../market/sweepDetector");

exports.getSweeps = (req, res) => {
  try {
    const symbol =
      req.query.symbol || "BTCUSDT";

    const timeframe =
      req.query.timeframe || "1m";

    const sweeps = detectSweeps(
      symbol,
      timeframe
    );

    res.json({
      success: true,
      symbol,
      timeframe,
      sweeps,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};