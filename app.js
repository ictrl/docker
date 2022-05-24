require("dotenv").config();
require("./initDB")(); //connect to mongoDB
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.json({
    MSG: "welcome to express with docker real time update.",
    ENV: process.env.ENV || "LOCAL",
    DB_STATUS,
    DB_URL,
  });
});

app.listen(PORT, () => console.log(`server is running on ${PORT}.`));
