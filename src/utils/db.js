const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

mongoose.connection.on("error", function (err) {
  console.error("Error connecting to DB: ", err.stack);
});

mongoose.connection.on("disconnected", function () {
  console.log("Lost connection from database");
  console.log("Retrying...");
  connectDB();
});

mongoose.connection.on("connected", function () {
  console.log("Connected to DB");
});

mongoose.connection.on("reconnected", function () {
  console.log("Reconnected...");
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Force close MongoDB connection");
    process.exit(0);
  });
});

module.exports = {
  connectDB,
};
