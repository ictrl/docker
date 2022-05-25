const redis = require("redis");

let redisPort = 6379;
let redisHost = process.env.REDIS_HOST || "127.0.0.1"; 
const client = redis.createClient({
  socket: {
    port: redisPort,
    host: redisHost,
  },
});

global.client = client;
module.exports = async () => {
  // Connect to redis server
  await client.connect();

  console.log("Attempting to connect to redis", redisHost);

  client.on("connect", () => {
    console.log("Connected!");
    client.set("from", "docker");
  });

  // Log any error that may occur to the console
  client.on("error", (err) => {
    console.error(`Error:${err}`);
  });

  // Close the connection when there is an interrupt sent from keyboard
  process.on("SIGINT", () => {
    client.quit();
    console.log("redis client quit");
  });
};
