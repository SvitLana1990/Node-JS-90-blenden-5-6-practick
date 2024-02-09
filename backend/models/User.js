const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Lana from DB: email is required"],
    },
    password: {
      type: String,
      required: [true, "Lana from DB: password is required"],
    },
    name: {
      type: String,
      default: "Monatik",
    },
    token: {
      type: String,
      default: null,
    },
    rolles: [{ type: String, ref: "rolles" }],
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("user", userSchema);
