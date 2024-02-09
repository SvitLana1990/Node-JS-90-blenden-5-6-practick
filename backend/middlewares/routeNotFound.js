module.exports = (req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "URL not found :(",
  });
  next();
};
