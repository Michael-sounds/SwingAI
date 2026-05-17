const express =
  require("express");

const cors =
  require("cors");

const http =
  require("http");

const {
  initializeSocket,
} = require("./socket/socketServer");

const candleRoutes =
  require("./api/routes/candles");

const swingRoutes =
  require("./api/routes/swings");

const sweepRoutes =
  require("./api/routes/sweeps");

const scannerRoutes =
  require("./api/routes/scanner");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/candles",
  candleRoutes
);

app.use(
  "/api/swings",
  swingRoutes
);

app.use(
  "/api/sweeps",
  sweepRoutes
);

app.use(
  "/api/scanner",
  scannerRoutes
);

const server =
  http.createServer(app);

initializeSocket(server);

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `API + SOCKET SERVER RUNNING ON ${PORT}`
  );
});