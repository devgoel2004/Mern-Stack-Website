const dotenv = require("dotenv");
const mongoose = require("mongoose");

const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });
