const mongoose = require("mongoose");
require("dotenv").config();
async function connectionToDb() {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connected successful with database");
    })
    .catch((err) => {
      console.log("error in mongodb", err);
    });
}
module.exports = connectionToDb;
