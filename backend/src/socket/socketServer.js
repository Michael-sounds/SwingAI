const { Server } =
  require("socket.io");

let io;

function initializeSocket(
  server
) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on(
    "connection",
    (socket) => {
      console.log(
        "[SOCKET] Client connected"
      );

      socket.on(
        "disconnect",
        () => {
          console.log(
            "[SOCKET] Client disconnected"
          );
        }
      );
    }
  );
}

function emitCandle(
  candle
) {
  if (io) {
    io.emit(
      "new_candle",
      candle
    );
  }
}

function emitSweep(
  sweep
) {
  if (io) {
    io.emit(
      "new_sweep",
      sweep
    );
  }
}

module.exports = {
  initializeSocket,
  emitCandle,
  emitSweep,
};