const { model, Schema } = require("mongoose");

const rollesSchema = new Schema(
  {
    value: {
      type: String,
      default: "USER",
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("rolles", rollesSchema);
