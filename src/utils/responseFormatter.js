const formatResponse = (res, response) => {
  res.status(200).json({
    status: 200,
    res: response,
    error: null,
  });
};

module.exports = {
  formatResponse,
};
