const axios = require("axios");

const keepAlive = () => {
  const SELF_URL = "https://api-aryan-music.onrender.com/";
  const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes

  setInterval(async () => {
    try {
      const response = await axios.get(SELF_URL);
      console.log(`Self-ping successful: ${response.status}`);
    } catch (error) {
      console.error("Error during self-ping:", error.message);
    }
  }, PING_INTERVAL);
};

module.exports = keepAlive;