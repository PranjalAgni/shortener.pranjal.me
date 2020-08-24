const HttpStatus = require("http-status-codes");

const formatResponse = (res, response) => {
  res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    result: {
      ...response,
    },
    error: null,
  });
};

module.exports = {
  formatResponse,
};
