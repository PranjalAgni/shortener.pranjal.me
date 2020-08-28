const path = require("path");
const HttpStatus = require("http-status-codes");

const authorization = (req, res, next) => {
  const date = new Date();
  const weekday = date.toLocaleString("default", { weekday: "long" });

  if (
    process.env.NODE_ENV === "development" ||
    req.headers["x-api-key"] === weekday
  ) {
    next();
  } else {
    res.status(HttpStatus.UNAUTHORIZED);
    next(new Error(HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)));
  }
};

const notFound = (req, res, next) => {
  const notFoundPath = path.join(__dirname, "../", "dist/404.html");
  res.status(HttpStatus.NOT_FOUND).sendFile(notFoundPath);
};

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    res.status(HttpStatus.UNPROCESSABLE_ENTITY);
    error.message = error.errors[0];
  } else if (error.message === HttpStatus.getStatusText(HttpStatus.CONFLICT)) {
    res.status(HttpStatus.CONFLICT);
  }

  const statusCode = res.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  res.status(statusCode);
  res.json({
    status: statusCode,
    result: null,
    error: process.env.NODE_ENV === "production" ? true : error.stack,
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
