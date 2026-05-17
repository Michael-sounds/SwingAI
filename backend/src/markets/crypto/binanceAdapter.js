const WebSocket = require("ws");

const MarketAdapter =
  require("../core/marketAdapter");

const normalizeCandle =
  require("../core/normalizeCandle");

class BinanceAdapter extends MarketAdapter {
  constructor() {
    super("Binance");

    this.ws = null;

    this.reconnectDelay = 5000;
  }

  connect(
    symbols,
    timeframe = "1m"
  ) {
    const streams = symbols
      .map(
        (s) =>
          `${s.toLowerCase()}@kline_${timeframe}`
      )
      .join("/");

    const url =
      `wss://stream.binance.com:9443/stream?streams=${streams}`;

    console.log(
      "[BINANCE] Connecting..."
    );

    this.ws = new WebSocket(url);

    this.ws.on("open", () => {
      console.log(
        "[BINANCE] Connected"
      );
    });

    this.ws.on(
      "message",
      (raw) => {
        try {
          const parsed =
            JSON.parse(raw);

          const k =
            parsed.data.k;

          // ONLY CLOSED CANDLES
          if (!k.x) return;

          const candle =
            normalizeCandle({
              symbol: k.s,

              timeframe,

              open: k.o,
              high: k.h,
              low: k.l,
              close: k.c,

              volume: k.v,

              timestamp: k.T,

              source:
                "binance",
            });

          this.emitCandle(
            candle
          );
        } catch (err) {
          console.error(
            "[BINANCE PARSE ERROR]",
            err.message
          );
        }
      }
    );

    this.ws.on("error", (err) => {
      console.error(
        "[BINANCE ERROR]",
        err.message
      );
    });

    this.ws.on("close", () => {
      console.log(
        "[BINANCE] Disconnected"
      );

      console.log(
        `[BINANCE] Reconnecting in ${
          this.reconnectDelay /
          1000
        } seconds...`
      );

      setTimeout(() => {
        this.connect(
          symbols,
          timeframe
        );
      }, this.reconnectDelay);
    });
  }
}

module.exports =
  BinanceAdapter;