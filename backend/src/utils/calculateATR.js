function calculateATR(candles, period = 14) {
  if (candles.length < period + 1) {
    return null;
  }

  const trueRanges = [];

  for (let i = 1; i < candles.length; i++) {
    const current = candles[i];
    const previous = candles[i - 1];

    const highLow = current.high - current.low;

    const highClose = Math.abs(
      current.high - previous.close
    );

    const lowClose = Math.abs(
      current.low - previous.close
    );

    const trueRange = Math.max(
      highLow,
      highClose,
      lowClose
    );

    trueRanges.push(trueRange);
  }

  const recentTR = trueRanges.slice(-period);

  const atr =
    recentTR.reduce((sum, tr) => sum + tr, 0) / period;

  return atr;
}

module.exports = calculateATR;