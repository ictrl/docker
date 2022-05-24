const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

  mongoose.connection.on("connected", () => {
    global.DB_STATUS = true
    global.DB_URL = process.env.MONGODB_URI;
    
    console.log("Mongoose connected to db...");
  });

  mongoose.connection.on("error", (err) => {
    global.DB_STATUS = false;
    global.DB_URL = null;

    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected...");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose connection is disconnected due to app termination..."
      );
      process.exit(0);
    });
  });
};
