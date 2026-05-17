import {
  useEffect,
  useState,
} from "react";

import Chart from "./components/Chart";

import Scanner from "./components/Scanner";

import SymbolSelector from "./components/SymbolSelector";

import TimeframeSelector from "./components/TimeframeSelector";

import {
  fetchCandles,
  fetchScanner,
} from "./services/api";

import socket from "./socket";

export default function App() {
  const [candles, setCandles] =
    useState([]);

  const [markets, setMarkets] =
    useState([]);

  const [symbol, setSymbol] =
    useState("BTCUSDT");

  const [
    timeframe,
    setTimeframe,
  ] = useState("1m");

  const [
    liveCandle,
    setLiveCandle,
  ] = useState(null);

  async function loadData() {
    try {
      const candleData =
        await fetchCandles(
          symbol,
          timeframe
        );

      const scannerData =
        await fetchScanner(
          timeframe
        );

      setCandles(candleData);

      setMarkets(scannerData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();

    socket.on(
      "new_candle",
      (candle) => {
        if (
          candle.symbol ===
            symbol &&
          candle.timeframe ===
            timeframe
        ) {
          setLiveCandle(
            candle
          );
        }
      }
    );

    return () => {
      socket.off(
        "new_candle"
      );
    };
  }, [symbol, timeframe]);

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h1>
        MARKET DASHBOARD
      </h1>

      <SymbolSelector
        symbol={symbol}
        setSymbol={setSymbol}
      />

      <TimeframeSelector
        timeframe={timeframe}
        setTimeframe={
          setTimeframe
        }
      />

      <Chart
        candles={candles}
        liveCandle={
          liveCandle
        }
      />

      <Scanner
        markets={markets}
      />
    </div>
  );
}