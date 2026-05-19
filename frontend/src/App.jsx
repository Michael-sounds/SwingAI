import {
  useEffect,
  useState,
} from "react";

import Login from "./components/Login";

import Chart from "./components/Chart";

import {
  fetchCandles,
} from "./api.js";

import "./app.css";

export default function App() {
  const [loggedIn, setLoggedIn] =
    useState(false);

  const [candles, setCandles] =
    useState([]);

  useEffect(() => {
    const access =
      localStorage.getItem(
        "swingai_access"
      );

    if (access === "true") {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!loggedIn)
      return;

    async function loadData() {
      try {
        const data =
          await fetchCandles(
            "BTCUSDT",
            "1m"
          );

        setCandles(data);
      } catch (err) {
        console.log(err);
      }
    }

    loadData();
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <Login
        onLoginSuccess={() =>
          setLoggedIn(true)
        }
      />
    );
  }

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        Market Dashboard
      </h1>

      <Chart
        candles={candles}
      />
    </div>
  );
}