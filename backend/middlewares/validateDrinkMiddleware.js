module.exports = (drinkJoiSchema) => {
  return (req, res, next) => {
    const { error } = drinkJoiSchema.validate(req.body);
    if (error) {
      const message = `Joi validator: ${error.details[0].message}`;
      res.status(400).json({
        code: 400,
        message,
      });
    }
    next();
  };
};
