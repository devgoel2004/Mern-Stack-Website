const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../database/db");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello World from the server router js");
});
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please filled the field properly" });
  }
  try {
    userFound = await User.findOne({ email: email });

    //use to check user is register or not

    if (userFound) {
      return res.status(422).json({ error: "Email already exist" });
    }

    //use to check confirm password is same or not

    if (cpassword != password) {
      return res
        .status(422)
        .json({ error: "Confirm Password and Password must matched" });
    }
    //use to save data
    const user = new User({ name, email, phone, work, password, cpassword });

    const userRegister = await user.save();
    //if user is registration is successfull other not.
    if (userRegister) {
      res.status(201).json({ message: "Successfully Fetched" });
    } else {
      res.status(500).json({ error: "Failed to registerd" });
    }
  } catch (err) {
    console.log(err, "Error occur in finding email");
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json(400).json({ message: "Please enter correct data" });
    }
    const userLogin = await User.findOne({ email: email });
    //console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = userLogin.generateAuthToken();
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.status(200).json({ message: "User Login Successfull" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(201).json({
      messsage: "Error occur in login",
    });
  }
});
module.exports = router;
