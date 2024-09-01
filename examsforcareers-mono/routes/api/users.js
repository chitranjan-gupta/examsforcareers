const bcrypt = require("bcryptjs");
const authenticate = require("../../middleware/authenticate");
const User = require("../../models/user");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(422).json({ message: "Email Already Exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        cemail: req.body.cemail,
        phone: req.body.phone,
        cphone: req.body.cphone,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });
      await newUser.save();
      res.json({ message: "Registered" });
    }
  } catch (err) {}
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Empty" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Password" });
      } else {
        res.json({ message: "User Signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Username" });
    }
  } catch (err) {}
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => user.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {}
});

router.get("/user", authenticate, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {}
});

router.get("/signout", authenticate, async (req, res) => {
  try {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User Logout");
  } catch (err) {}
});

module.exports = router;
