function normalizeCandle(data) {
  return {
    symbol: data.symbol,
    timeframe: data.timeframe,

    open: Number(data.open),
    high: Number(data.high),
    low: Number(data.low),
    close: Number(data.close),

    volume: Number(data.volume),

    timestamp: Number(data.timestamp),

    source: data.source,
  };
}

module.exports = normalizeCandle;