const { model, Schema } = require("mongoose");

const drinkSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Artem from DB: title is required"],
    },
    valve: { type: Number, default: 0.0 },
    price: {
      type: Number,
      required: [true, "Artem from DB: prise is required"],
    },
    adult: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("drink", drinkSchema);
