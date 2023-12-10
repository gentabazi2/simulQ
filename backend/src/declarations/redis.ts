const redis = require("redis");
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

(async () => {
  try {
    client.connect().then(() => {
      console.log("redis is connected");
    });
  } catch (e) {
    console.log("error caught", e);
  }
})();

module.exports = client;
