const MarketAdapter =
  require("../core/marketAdapter");

class ForexAdapter extends MarketAdapter {
  constructor() {
    super("Forex");
  }

  connect() {
    console.log(
      "[FOREX] Adapter not implemented yet"
    );
  }
}

module.exports = ForexAdapter;