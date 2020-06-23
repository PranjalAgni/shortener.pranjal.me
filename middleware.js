const path = require('path');

const notFound = (req, res, next) => {
  const notFoundPath = path.join(__dirname, 'public/404.html');
  res.status(404).sendFile(notFoundPath);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.status || 500;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '😁' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
