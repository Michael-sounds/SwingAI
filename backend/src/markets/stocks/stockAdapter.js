const MarketAdapter =
  require("../core/marketAdapter");

class StockAdapter extends MarketAdapter {
  constructor() {
    super("Stocks");
  }

  connect() {
    console.log(
      "[STOCKS] Adapter not implemented yet"
    );
  }
}

module.exports = StockAdapter;