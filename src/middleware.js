const path = require("path");

const authentication = (req, res, next) => {
  if (
    process.env.NODE_ENV === "development" ||
    req.headers["X-API-KEY"] === "token"
  ) {
    next();
  } else {
    res.status(401);
    next(new Error("Unauthorized user"));
  }
};

const notFound = (req, res, next) => {
  const notFoundPath = path.join(__dirname, "../", "public/404.html");
  res.status(404).sendFile(notFoundPath);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "😁" : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
  authentication,
};
