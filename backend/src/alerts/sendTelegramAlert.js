const axios = require("axios");

async function sendTelegramAlert(message) {

  const token =
    process.env.TELEGRAM_BOT_TOKEN;

  const chatId =
    process.env.TELEGRAM_CHAT_ID;

  const url =
    `https://api.telegram.org/bot${token}/sendMessage`;

  try {

    await axios.post(url, {
      chat_id: chatId,
      text: message,
    });

    console.log(
      "📲 Telegram Alert Sent"
    );

  } catch (error) {

    console.error(
      "Telegram Error:",
      error.message
    );
  }
}

module.exports = sendTelegramAlert;