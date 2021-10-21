const express = require("express");
const mongoose = require("mongoose");

// const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

const db_server = process.env.DB_ENV || "primary";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes"));

// app.use(bodyParser.json());

var gracefulExit = function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection with DB :" +
        db_server +
        " is disconnected through app termination"
    );
    process.exit(0);
  });
};

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network",
  {
    //mongoose version 6 doesnt support
    //useFindAndModify: false,
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  }
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
