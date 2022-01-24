const User = require("../models/userModule");

// @route       GET  /profile/:username
// @desc        Users profile page
// @acsess      Private

const getProfilePage = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).lean();
    console.log(user);
    if (!user) throw new Error("Bunday faydalanuvchi mavjud emas");
    res.render("user/profile", {
      title: `${user.username}`,
      user,
      isAuth: req.session.isLogged,
      url: process.env.URL,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProfilePage };
