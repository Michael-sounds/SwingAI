class MarketAdapter {
  constructor(name) {
    this.name = name;
  }

  connect() {
    throw new Error("connect() must be implemented");
  }

  subscribe(symbols, timeframe) {
    throw new Error("subscribe() must be implemented");
  }

  onCandle(callback) {
    this.candleCallback = callback;
  }

  emitCandle(candle) {
    if (this.candleCallback) {
      this.candleCallback(candle);
    }
  }
}

module.exports = MarketAdapter;