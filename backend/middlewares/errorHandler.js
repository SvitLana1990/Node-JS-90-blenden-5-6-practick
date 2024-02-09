module.exports = (error, req, res, next) => {
  const statusCode = res.statusCode || res.code || res.status || 500;
  res.status(statusCode).json({
    code: statusCode,
    stack: error.stack,
  });
};
