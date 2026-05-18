import {
  createChart,
  CandlestickSeries,
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
    useRef(null);

  const seriesRef =
    useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current)
      return;

    const chart =
      createChart(
        chartContainerRef.current,
        {
          width: 900,
          height: 500,
        }
      );

    const candleSeries =
      chart.addSeries(
        CandlestickSeries
      );

    seriesRef.current =
      candleSeries;

    const formatted =
      candles.map((c) => ({
        time:
          c.timestamp / 1000,

        open: Number(c.open),

        high: Number(c.high),

        low: Number(c.low),

        close: Number(c.close),
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

        open: Number(
          liveCandle.open
        ),

        high: Number(
          liveCandle.high
        ),

        low: Number(
          liveCandle.low
        ),

        close: Number(
          liveCandle.close
        ),
      });
    }
  }, [liveCandle]);

  return (
    <div
      ref={chartContainerRef}
    />
  );
}