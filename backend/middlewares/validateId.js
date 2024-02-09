const { isValidObjectId } = require("mongoose");

module.exports = (req, res, next) => {
  // console.log(req.params.id);
  if (!isValidObjectId(req.params.id)) {
    res.status(400).json({
      code: 400,
      message: "Invalid ID",
    });
  }
  next();
};
