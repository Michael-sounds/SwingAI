require("dotenv").config();

const connectDB =
  require("./database/connectDB");

require("./server");

const startWebsockets =
  require("./websocket/websocketManager");

async function startApp() {
  await connectDB();

  console.log(
    "STARTING MULTI-MARKET ENGINE..."
  );

  startWebsockets();
}

startApp();