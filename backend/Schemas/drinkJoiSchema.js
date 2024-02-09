const Joi = require("joi");

const drinkJoiSchema = Joi.object({
  title: Joi.string().required(),

  valve: Joi.number(),

  price: Joi.number().required(),

  adult: Joi.boolean(),
});

module.exports = drinkJoiSchema;
