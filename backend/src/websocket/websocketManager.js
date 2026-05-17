const registry =
  require("../markets/core/symbolRegistry");

const BinanceAdapter =
  require("../markets/crypto/binanceAdapter");

const marketEngine =
  require("../markets/core/marketEngine");

function startWebsockets() {
  const binance =
    new BinanceAdapter();

  binance.onCandle((candle) => {
    marketEngine.processCandle(candle);
  });

  binance.connect(
    registry.crypto,
    "1m"
  );
}

module.exports = startWebsockets;