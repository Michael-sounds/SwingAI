const scoreSweep =
  require("./scoreSweep");

function detectSweeps(
  candles,
  swings
) {

  const sweeps = [];

  if (
    candles.length < 1 ||
    swings.length < 1
  ) {
    return sweeps;
  }

  const currentCandle =
    candles[candles.length - 1];

  for (const swing of swings) {

    // -------------------------
    // BEARISH SWEEP
    // -------------------------

    if (
      swing.type === "HIGH" &&

      currentCandle.high >
        swing.price &&

      currentCandle.close <
        swing.price
    ) {

      const score =
        scoreSweep(
          swing,
          currentCandle
        );

      // Reject weak sweeps
      if (score < 60) {
        continue;
      }

      sweeps.push({

        type:
          "BEARISH_SWEEP",

        sweptPrice:
          swing.price,

        currentHigh:
          currentCandle.high,

        close:
          currentCandle.close,

        strength:
          swing.strength,

        score,

        time:
          currentCandle.closeTime,
      });
    }

    // -------------------------
    // BULLISH SWEEP
    // -------------------------

    if (
      swing.type === "LOW" &&

      currentCandle.low <
        swing.price &&

      currentCandle.close >
        swing.price
    ) {

      const score =
        scoreSweep(
          swing,
          currentCandle
        );

      // Reject weak sweeps
      if (score < 60) {
        continue;
      }

      sweeps.push({

        type:
          "BULLISH_SWEEP",

        sweptPrice:
          swing.price,

        currentLow:
          currentCandle.low,

        close:
          currentCandle.close,

        strength:
          swing.strength,

        score,

        time:
          currentCandle.closeTime,
      });
    }
  }

  return sweeps;
}

module.exports = detectSweeps;