require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { nanoid } = require("nanoid");

const db = require("./utils/db");

const { notFound, errorHandler, authorization } = require("./middleware");

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

app.post("/create/url", async (req, res, next) => {
  const { targetUrl, shortId } = req.body;
  let shortCode = shortId;

  if (!shortCode) {
    shortCode = nanoid();
  }

  // Keeping short codes case insensitive
  shortCode = shortCode.toLowerCase();
  console.log(targetUrl, shortCode);

  res.status(200).json({
    message: "Authenticated 🔐",
    targetUrl,
    shortCode,
  });
});

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server running at port 3000`);
});
