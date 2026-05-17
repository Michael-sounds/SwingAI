export default function TimeframeSelector({
  timeframe,
  setTimeframe,
}) {
  const timeframes = [
    "1m",
    "5m",
    "15m",
  ];

  return (
    <select
      value={timeframe}
      onChange={(e) =>
        setTimeframe(
          e.target.value
        )
      }
    >
      {timeframes.map(
        (tf) => (
          <option
            key={tf}
            value={tf}
          >
            {tf}
          </option>
        )
      )}
    </select>
  );
}