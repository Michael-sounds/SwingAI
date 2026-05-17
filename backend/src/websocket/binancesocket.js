const WebSocket = require("ws");

const {
  markets,
  timeframes,
} = require("../config/markets");

function startBinanceSocket(
  onCandleClose
) {

  const streams = [];

  for (const symbol of markets) {

    for (const timeframe of timeframes) {

      streams.push(
        `${symbol}@kline_${timeframe}`
      );
    }
  }

  const wsURL =
    `wss://stream.binance.com:9443/stream?streams=${streams.join("/")}`;

  const ws = new WebSocket(wsURL);

  ws.on("open", () => {

    console.log(
      "✅ Multi-Timeframe Stream Connected"
    );
  });

  ws.on("message", (data) => {

    const parsed =
      JSON.parse(data);

    const response =
      parsed.data;

    const candle =
      response.k;

    const formattedCandle = {

      symbol: response.s,

      timeframe:
        candle.i,

      open:
        parseFloat(candle.o),

      high:
        parseFloat(candle.h),

      low:
        parseFloat(candle.l),

      close:
        parseFloat(candle.c),

      volume:
        parseFloat(candle.v),

      closed:
        candle.x,

      startTime:
        candle.t,

      closeTime:
        candle.T,
    };

    if (formattedCandle.closed) {

      console.log(
        `📈 ${formattedCandle.symbol} ${formattedCandle.timeframe} CLOSED`
      );

      onCandleClose(
        formattedCandle
      );
    }
  });

  ws.on("error", (err) => {

    console.error(
      "Socket Error:",
      err.message
    );
  });

  ws.on("close", () => {

    console.log(
      "❌ WebSocket Closed"
    );
  });
}

module.exports =
  startBinanceSocket;