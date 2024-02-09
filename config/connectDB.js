const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const db = await connect(process.env.MONGODB_STRING);
    console.log(
      `DB IS CONNECTED. NAME: ${db.connection.name}. HOST: ${db.connection.host}. PORT: ${db.connection.port}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
