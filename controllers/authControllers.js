const bcrypt = require("bcryptjs");
const Users = require("../models/userModule");

// @route       GET  /auth/login
// @desc        Get login page
// @acsess      Public
const getLoginPage = (req, res) => {
  if (!req.session.isLogged) {
    res.render("auth/login", {
      title: "Login",
      url: process.env.URL,
    });
  }
};

// @route       GET  /auth/signup
// @desc        Get register page
// @acsess      Public
const getRegisterPage = (req, res) => {
  if (!req.session.isLogged) {
    res.render("auth/signup", {
      title: "Registratsiya",
      url: process.env.URL,
    });
  }
};

// @route       POST  /auth/signup
// @desc        Register new user to database
// @acsess      Public
const registerNewUser = async (req, res) => {
  try {
    const { email, username, phone, password, password2 } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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
      password: hashedPassword,
    });
    return res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
  }
};

// @route       POST  /auth/login
// @desc        Login user to website
// @acsess      Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await Users.findOne({ email });
    if (userExist) {
      const matchPassword = await bcrypt.compare(
        req.body.password,
        userExist.password
      );
      if (matchPassword) {
        req.session.user = userExist;
        req.session.isLogged = true;
        req.session.save((err) => {
          if (err) throw err;
          res.redirect("/profile/" + req.session.user.username);
        });
      } else {
        res.redirect("auth/login");
      }
    } else {
      res.redirect("auth/login");
    }
  } catch (err) {
    console.log(err);
  }
};

// @route       GET  /auth/logout
// @desc        Logout user
// @acsess      Private
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
  loginUser,
  logout,
};
