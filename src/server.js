const path = require("path");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const { notFound, errorHandler } = require("./middleware");

require("dotenv").config();

const app = express();
app.enable("trust proxy");

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../", "public")));

// to serve app.js which is linked in index.html file
app.get("/app.js", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../", "public/app.js"));
});

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server running at port 3000`);
});
