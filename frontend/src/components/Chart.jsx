import {
  createChart,
  CandlestickSeries,
} from "lightweight-charts";

import {
  useEffect,
  useRef,
} from "react";

export default function Chart({
  candles = [],
}) {
  const chartContainerRef =
    useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current)
      return;

    const chart =
      createChart(
        chartContainerRef.current,
        {
          width:
            chartContainerRef.current
              .clientWidth || 900,

          height: 500,

          layout: {
            background: {
              color: "#ffffff",
            },

            textColor: "#000",
          },

          grid: {
            vertLines: {
              color: "#eee",
            },

            horzLines: {
              color: "#eee",
            },
          },
        }
      );

    const candleSeries =
      chart.addSeries(
        CandlestickSeries
      );

    const formattedCandles =
      candles.map((c) => ({
        time: Math.floor(
          c.timestamp / 1000
        ),

        open: Number(c.open),

        high: Number(c.high),

        low: Number(c.low),

        close: Number(c.close),
      }));

    candleSeries.setData(
      formattedCandles
    );

    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({
        width:
          chartContainerRef.current
            .clientWidth,
      });
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      chart.remove();
    };
  }, [candles]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
}