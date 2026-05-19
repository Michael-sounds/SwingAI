require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const http =
  require("http");

const mongoose =
  require("mongoose");

const { Server } =
  require("socket.io");

const authRoutes =
  require("./routes/authRoutes");

const app = express();

const server =
  http.createServer(app);

/* ---------------- SOCKET.IO ---------------- */

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());

app.use(express.json());

/* ---------------- DATABASE ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "Database connected"
    );
  })
  .catch((err) => {
    console.log(
      "Database error:",
      err.message
    );
  });

/* ---------------- ROUTES ---------------- */

app.use(
  "/api/auth",
  authRoutes
);

/* ---------------- HOME ---------------- */

app.get("/", (req, res) => {
  res.send(
    "SwingAI Backend Running"
  );
});

/* ---------------- CANDLES ---------------- */

app.get(
  "/api/candles",
  (req, res) => {
    const candles = [
      {
        timestamp:
          Date.now() -
          60000 * 4,

        open: 105000,

        high: 106000,

        low: 104500,

        close: 105500,
      },

      {
        timestamp:
          Date.now() -
          60000 * 3,

        open: 105500,

        high: 106500,

        low: 105000,

        close: 106200,
      },

      {
        timestamp:
          Date.now() -
          60000 * 2,

        open: 106200,

        high: 107000,

        low: 105800,

        close: 106800,
      },

      {
        timestamp:
          Date.now() -
          60000,

        open: 106800,

        high: 107500,

        low: 106500,

        close: 107200,
      },

      {
        timestamp:
          Date.now(),

        open: 107200,

        high: 108000,

        low: 107000,

        close: 107700,
      },
    ];

    res.json({
      candles,
    });
  }
);

/* ---------------- SWEEPS ---------------- */

app.get(
  "/api/sweeps",
  (req, res) => {
    res.json({
      sweeps: [],
    });
  }
);

/* ---------------- SCANNER ---------------- */

app.get(
  "/api/scanner",
  (req, res) => {
    res.json({
      markets: [
        {
          symbol:
            "BTCUSDT",

          signal: "BUY",
        },

        {
          symbol:
            "ETHUSDT",

          signal: "SELL",
        },
      ],
    });
  }
);

/* ---------------- SOCKET CONNECTION ---------------- */

io.on(
  "connection",
  (socket) => {
    console.log(
      "Client connected"
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          "Client disconnected"
        );
      }
    );
  }
);

/* ---------------- SERVER ---------------- */

const PORT =
  process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});