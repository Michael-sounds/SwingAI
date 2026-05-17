const Candle =
  require("../models/Candle");

const store = {};

async function addCandle(
  symbol,
  timeframe,
  candle
) {
  if (!store[symbol]) {
    store[symbol] = {};
  }

  if (!store[symbol][timeframe]) {
    store[symbol][timeframe] = [];
  }

  store[symbol][timeframe].push(
    candle
  );

  if (
    store[symbol][timeframe]
      .length > 500
  ) {
    store[symbol][timeframe].shift();
  }

  try {
    await Candle.create(
      candle
    );
  } catch (err) {
    console.error(
      "[DB CANDLE ERROR]",
      err.message
    );
  }
}

function getCandles(
  symbol,
  timeframe
) {
  return (
    store[symbol]?.[
      timeframe
    ] || []
  );
}

module.exports = {
  addCandle,
  getCandles,
};