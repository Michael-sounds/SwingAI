const {
  addCandle,
} = require("../../market/candleStore");

const detectSwings =
  require("../../market/swingDetector");

const detectSweeps =
  require("../../market/sweepDetector");

const {
  emitCandle,
  emitSweep,
} = require("../../socket/socketServer");

const Swing =
  require("../../models/Swing");

const Sweep =
  require("../../models/Sweep");

class MarketEngine {
  async processCandle(
    candle
  ) {
    try {
      // SAVE CANDLE
      await addCandle(
        candle.symbol,
        candle.timeframe,
        candle
      );

      // LIVE UPDATE
      emitCandle(candle);

      // DETECT SWINGS
      const swings =
        detectSwings(
          candle.symbol,
          candle.timeframe
        );

      // SAVE SWINGS
      if (
        swings &&
        swings.length
      ) {
        for (const swing of swings) {
          await Swing.create({
            symbol:
              candle.symbol,

            timeframe:
              candle.timeframe,

            ...swing,
          });
        }
      }

      // DETECT SWEEPS
      const sweeps =
        detectSweeps(
          candle.symbol,
          candle.timeframe
        );

      // SAVE + EMIT SWEEPS
      if (
        sweeps &&
        sweeps.length
      ) {
        for (const sweep of sweeps) {
          await Sweep.create({
            symbol:
              candle.symbol,

            timeframe:
              candle.timeframe,

            ...sweep,
          });

          emitSweep({
            symbol:
              candle.symbol,

            timeframe:
              candle.timeframe,

            ...sweep,
          });
        }
      }

      console.log(
        `[ENGINE] ${candle.symbol} ${candle.timeframe}`
      );
    } catch (err) {
      console.error(
        "[ENGINE ERROR]",
        err.message
      );
    }
  }
}

module.exports =
  new MarketEngine();