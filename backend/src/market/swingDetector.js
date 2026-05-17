const {
  getCandles,
} = require("./candleStore");

function detectSwings(
  symbol,
  timeframe
) {
  const candles =
    getCandles(symbol, timeframe);

  if (candles.length < 5) {
    return [];
  }

  const swings = [];

  for (
    let i = 2;
    i < candles.length - 2;
    i++
  ) {
    const current = candles[i];

    // SWING HIGH
    if (
      current.high >
        candles[i - 1].high &&
      current.high >
        candles[i - 2].high &&
      current.high >
        candles[i + 1].high &&
      current.high >
        candles[i + 2].high
    ) {
      swings.push({
        type: "HIGH",
        price: current.high,
        timestamp:
          current.timestamp,
      });
    }

    // SWING LOW
    if (
      current.low <
        candles[i - 1].low &&
      current.low <
        candles[i - 2].low &&
      current.low <
        candles[i + 1].low &&
      current.low <
        candles[i + 2].low
    ) {
      swings.push({
        type: "LOW",
        price: current.low,
        timestamp:
          current.timestamp,
      });
    }
  }

  return swings;
}

module.exports = detectSwings;