const Users = require("../models/userModule");

// @route       GET  /auth/login
// @desc        Get login page
// @acsess      Public
const getLoginPage = (req, res) => {
  res.render("auth/login", {
    title: "Login",
    url: process.env.URL,
  });
};

// @route       GET  /auth/signup
// @desc        Get register page
// @acsess      Public
const getRegisterPage = (req, res) => {
  res.render("auth/signup", {
    title: "Registratsiya",
    url: process.env.URL,
  });
};

// @route       POST  /auth/signup
// @desc        Register new user to database
// @acsess      Public
const registerNewUser = async (req, res) => {
  try {
    const { email, username, phone, password, password2 } = req.body;
    const userExist = await Users.findOne({ email });
    if (userExist) {
      return res.redirect("/auth/signup");
    }
    if (password !== password2) {
      return res.redirect("/auth/signup");
    }
    await Users.create({
      email,
      username,
      phone,
      password,
    });
    return res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getLoginPage, getRegisterPage, registerNewUser };
