const mongoose = require("mongoose");

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = connect;
