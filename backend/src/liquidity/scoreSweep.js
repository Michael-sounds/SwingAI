function scoreSweep(
  swing,
  currentCandle
) {

  let score = 0;

  // -------------------------
  // PENETRATION DEPTH
  // -------------------------

  const penetration =
    Math.abs(
      currentCandle.high -
      swing.price
    );

  if (penetration > 20) {
    score += 25;
  }

  // -------------------------
  // REJECTION STRENGTH
  // -------------------------

  const rejection =
    Math.abs(
      currentCandle.high -
      currentCandle.close
    );

  if (rejection > 30) {
    score += 30;
  }

  // -------------------------
  // CANDLE BODY SIZE
  // -------------------------

  const bodySize =
    Math.abs(
      currentCandle.close -
      currentCandle.open
    );

  if (bodySize > 20) {
    score += 20;
  }

  // -------------------------
  // SWING STRENGTH
  // -------------------------

  score += Math.min(
    25,
    swing.strength / 4
  );

  return Math.min(score, 100);
}

module.exports = scoreSweep;