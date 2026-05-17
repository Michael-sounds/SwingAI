const calculateATR = require("../utils/calculateATR");

function detectSwings(candles) {
  const swings = [];

  if (candles.length < 20) {
    return swings;
  }

  const atr = calculateATR(candles);

  for (let i = 2; i < candles.length - 2; i++) {
    const current = candles[i];

    const prev1 = candles[i - 1];
    const prev2 = candles[i - 2];

    const next1 = candles[i + 1];
    const next2 = candles[i + 2];

    // --------------------
    // SWING HIGH
    // --------------------

    const isSwingHigh =
      current.high > prev1.high &&
      current.high > prev2.high &&
      current.high > next1.high &&
      current.high > next2.high;

    // --------------------
    // SWING LOW
    // --------------------

    const isSwingLow =
      current.low < prev1.low &&
      current.low < prev2.low &&
      current.low < next1.low &&
      current.low < next2.low;

    // --------------------
    // DISPLACEMENT
    // --------------------

    const bearishMove =
      current.high - next2.low;

    const bullishMove =
      next2.high - current.low;

    // --------------------
    // VALIDATION RULES
    // --------------------

    const minimumMove = atr * 0.8;

    // VALID HIGH
    if (
      isSwingHigh &&
      bearishMove > minimumMove
    ) {
      const strength = Math.min(
        100,
        Math.round(
          (bearishMove / atr) * 25
        )
      );

      swings.push({
        type: "HIGH",
        price: current.high,
        strength,
        atr,
        displacement: bearishMove,
        time: current.closeTime,
      });
    }

    // VALID LOW
    if (
      isSwingLow &&
      bullishMove > minimumMove
    ) {
      const strength = Math.min(
        100,
        Math.round(
          (bullishMove / atr) * 25
        )
      );

      swings.push({
        type: "LOW",
        price: current.low,
        strength,
        atr,
        displacement: bullishMove,
        time: current.closeTime,
      });
    }
  }

  return swings;
}

module.exports = detectSwings;