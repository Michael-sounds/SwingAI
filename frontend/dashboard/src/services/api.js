import axios from "axios";

const API =
  "http://localhost:5000/api";

export async function fetchCandles(
  symbol,
  timeframe
) {
  const res = await axios.get(
    `${API}/candles`,
    {
      params: {
        symbol,
        timeframe,
      },
    }
  );

  return res.data.candles;
}

export async function fetchSweeps(
  symbol,
  timeframe
) {
  const res = await axios.get(
    `${API}/sweeps`,
    {
      params: {
        symbol,
        timeframe,
      },
    }
  );

  return res.data.sweeps;
}

export async function fetchScanner(
  timeframe
) {
  const res = await axios.get(
    `${API}/scanner`,
    {
      params: {
        timeframe,
      },
    }
  );

  return res.data.markets;
}