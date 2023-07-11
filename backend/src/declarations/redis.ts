const redis = require("redis");
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

(async()=>{
    client.connect().then(()=> {
        console.log('redis is connected')
      })
})();

module.exports = client;