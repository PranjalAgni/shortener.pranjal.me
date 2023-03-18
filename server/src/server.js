require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const db = require("./utils/db");
const constants = require("./utils/constants")
const { notFound, errorHandler } = require("./middleware");
const urls = require("./api/urls");
const redirect = require("./api/redirect");

// Connecting to MongoDB
db.connectDB();

const app = express();

// If we are behind some reverse proxy like Nginx then we can trust this
app.enable("trust proxy");

app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../", "dist")));

app.use("/api/url", urls);
app.use("/", redirect);

app.use(notFound);
app.use(errorHandler);

app.listen(constants.PORT, () => {
  console.log(`Server running at port 3000 in ${process.env.NODE_ENV} mode`);
});
