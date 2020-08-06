const path = require("path");

const authorization = (req, res, next) => {
  const date = new Date();
  const weekday = date.toLocaleString("default", { weekday: "long" });

  if (
    process.env.NODE_ENV === "development" ||
    req.headers["x-api-key"] === weekday
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
  if (error.name === "ValidationError") res.status(422);
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "😁" : error.stack,
  });
};

// DRY error handler, it is a higher order function
// which takes request handler function as input
// and then returns a new function which execute our
// original function and takes care of error handling

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {
  notFound,
  errorHandler,
  authorization,
  asyncHandler,
};
