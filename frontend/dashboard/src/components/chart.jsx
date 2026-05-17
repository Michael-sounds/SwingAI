import {
  createChart,
} from "lightweight-charts";

import {
  useEffect,
  useRef,
} from "react";

export default function Chart({
  candles,
  liveCandle,
}) {
  const chartContainerRef =
    useRef();

  const seriesRef =
    useRef();

  useEffect(() => {
    const chart =
      createChart(
        chartContainerRef.current,
        {
          width: 900,
          height: 500,
        }
      );

    const candleSeries =
      chart.addCandlestickSeries();

    seriesRef.current =
      candleSeries;

    const formatted =
      candles.map((c) => ({
        time:
          c.timestamp / 1000,

        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }));

    candleSeries.setData(
      formatted
    );

    return () => {
      chart.remove();
    };
  }, [candles]);

  useEffect(() => {
    if (
      liveCandle &&
      seriesRef.current
    ) {
      seriesRef.current.update({
        time:
          liveCandle.timestamp /
          1000,

        open:
          liveCandle.open,

        high:
          liveCandle.high,

        low:
          liveCandle.low,

        close:
          liveCandle.close,
      });
    }
  }, [liveCandle]);

  return (
    <div
      ref={chartContainerRef}
    />
  );
}