const registry =
  require("../markets/core/symbolRegistry");

const detectSweeps =
  require("../market/sweepDetector");

exports.scanMarkets = (req, res) => {
  try {
    const timeframe =
      req.query.timeframe || "1m";

    const results = [];

    registry.crypto.forEach((symbol) => {
      const sweeps =
        detectSweeps(
          symbol,
          timeframe
        );

      if (
        sweeps &&
        sweeps.length
      ) {
        results.push({
          symbol,
          sweeps,
        });
      }
    });

    res.json({
      success: true,
      timeframe,
      total: results.length,
      markets: results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};