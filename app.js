const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.json("welcome to express");
});

app.listen(PORT, ()=> console.log(`server is running on ${PORT}.`));