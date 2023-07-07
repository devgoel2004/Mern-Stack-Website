const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
dotenv.config({ path: "./.env" });
require("./database/db");
require("./model/userSchema");
app.use(express.json());
//we link the router file to mkaeour route easy
app.use(require("./router/auth"));
//middleware

const middleware = (req, res, next) => {
  console.log("Hello Dev");
  next();
};
app.get("/", (req, res) => {
  res.send("hello world from the server");
});
app.get("/about", middleware, (req, res) => {
  res.send("About Page");
});
app.get("/contact", (req, res) => {
  res.send("Contact Page");
});
app.get("/Login", (req, res) => {
  res.send("Login Page");
});
app.get("/signup", (req, res) => {
  res.send("Sign Up Page");
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
