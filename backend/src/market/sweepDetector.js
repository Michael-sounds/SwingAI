const {
  getCandles,
} = require("./candleStore");

const detectSwings =
  require("./swingDetector");

function detectSweeps(
  symbol,
  timeframe
) {
  const candles =
    getCandles(symbol, timeframe);

  const swings =
    detectSwings(
      symbol,
      timeframe
    );

  if (
    candles.length < 2 ||
    swings.length === 0
  ) {
    return [];
  }

  const lastCandle =
    candles[candles.length - 1];

  const sweeps = [];

  swings.forEach((swing) => {
    // HIGH SWEEP
    if (
      swing.type === "HIGH" &&
      lastCandle.high >
        swing.price &&
      lastCandle.close <
        swing.price
    ) {
      sweeps.push({
        type: "HIGH_SWEEP",
        sweptPrice:
          swing.price,
        timestamp:
          lastCandle.timestamp,
      });
    }

    // LOW SWEEP
    if (
      swing.type === "LOW" &&
      lastCandle.low <
        swing.price &&
      lastCandle.close >
        swing.price
    ) {
      sweeps.push({
        type: "LOW_SWEEP",
        sweptPrice:
          swing.price,
        timestamp:
          lastCandle.timestamp,
      });
    }
  });

  return sweeps;
}

module.exports = detectSweeps;