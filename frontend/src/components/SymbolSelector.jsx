export default function SymbolSelector({
  symbol,
  setSymbol,
}) {
  const symbols = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
  ];

  return (
    <select
      value={symbol}
      onChange={(e) =>
        setSymbol(
          e.target.value
        )
      }
    >
      {symbols.map((s) => (
        <option
          key={s}
          value={s}
        >
          {s}
        </option>
      ))}
    </select>
  );
}