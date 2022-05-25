require("dotenv").config();
require("./initDB")(); //connect to mongoDB
require("./initCache")(); //connect to mongoDB
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  return res.json({
    MSG: "WELCOME! DOCKER + NODE + EXPRESS + MONGODB  + REDIS",
    ENV: process.env.ENV || "LOCAL",
    REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
    DB_STATUS,
    DB_URL,
  });
});

app.get('/users/:name', async(req, res) => {
  const NAME = req.params.name;
  const cache = await client.get(NAME)
  if(cache){
      return res.status(200).send({
        message: `Retrieved ${NAME}'s data from the cache`,
        users: cache,
      });
  }else await client.set(NAME, "true");

  return res.status(200).send({
    message: `Retrieved ${NAME}'s data from the server`,
    users: NAME,
  });

})

app.listen(PORT, () => console.log(`server is running on ${PORT}.`));
