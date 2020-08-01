require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const db = require("./utils/db");
const { notFound, errorHandler, authorization } = require("./middleware");
const urls = require("./api/urls");

// Connecting to MongoDB
db.connectDB();

const app = express();

// If we are behind some reverse proxy like Nginx then we can trust this
app.enable("trust proxy");

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../", "public")));

// to serve app.js which is linked in index.html file
app.get("/app.js", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../", "public/app.js"));
});

app.use(authorization);

app.use("/api/url", urls);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server running at port 3000 in ${process.env.NODE_ENV} mode`);
});
