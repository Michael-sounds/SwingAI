export default function Scanner({
  markets,
}) {
  return (
    <div>
      <h2>
        Market Scanner
      </h2>

      {markets.map(
        (market, index) => (
          <div key={index}>
            <strong>
              {market.symbol}
            </strong>

            <p>
              Sweeps:
              {
                market.sweeps
                  .length
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}