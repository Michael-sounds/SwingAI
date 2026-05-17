require("dotenv").config();
require("./server");

const startBinanceSocket =
  require("./websocket/binanceSocket");

const {
  addCandle,
  getCandles,
} = require("./market/candleStore");

const detectSwings =
  require("./swings/detectSwings");

const detectSweeps =
  require("./liquidity/detectSweeps");

const sendTelegramAlert =
  require("./alerts/sendTelegramAlert");

const {
  hasAlerted,
  markAlerted,
} = require("./alerts/alertCache");

console.log(
  "🚀 Liquidity Engine Started"
);

startBinanceSocket(
  async (candle) => {

    addCandle(candle);

    const candles =
      getCandles(
        candle.symbol,
        candle.timeframe
      );

    const swings =
      detectSwings(candles);

    const sweeps =
      detectSweeps(
        candles,
        swings
      );

    for (const sweep of sweeps) {

      const alertKey =
        `${candle.symbol}-${candle.timeframe}-${sweep.type}-${sweep.sweptPrice}`;

      // Prevent duplicate alerts
      if (
        hasAlerted(alertKey)
      ) {
        continue;
      }

      markAlerted(alertKey);

      // -------------------------
      // CONFIDENCE
      // -------------------------

      let confidence =
        "MEDIUM";

      if (
        candle.timeframe === "4h"
      ) {
        confidence = "HIGH";
      }

      if (
        candle.timeframe === "1h"
      ) {
        confidence =
          "MEDIUM-HIGH";
      }

      // -------------------------
      // ALERT MESSAGE
      // -------------------------

      const message = `
🚨 LIQUIDITY SWEEP DETECTED

Symbol:
${candle.symbol}

Timeframe:
${candle.timeframe}

Type:
${sweep.type}

Swept Level:
${sweep.sweptPrice}

Current Close:
${sweep.close}

Strength:
${sweep.strength}/100

Sweep Score:
${sweep.score}/100

Confidence:
${confidence}
`;

      console.log(message);

      // -------------------------
      // TELEGRAM ALERT
      // -------------------------

      await sendTelegramAlert(
        message
      );

      // -------------------------
      // SEND TO FRONTEND
      // -------------------------

      global.io.emit(
        "newSweep",
        {
          symbol:
            candle.symbol,

          timeframe:
            candle.timeframe,

          type:
            sweep.type,

          score:
            sweep.score,

          strength:
            sweep.strength,

          price:
            sweep.sweptPrice,

          close:
            sweep.close,

          confidence,

          timestamp:
            Date.now(),
        }
      );
    }
  }
);