const User = require("../models/userModule");

// @route       GET  /profile/:username
// @desc        Users profile page
// @acsess      Private

const getProfilePage = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate("postres")
      .lean();
    if (!user) throw new Error("Bunday faydalanuvchi mavjud emas");

    const isMe = user._id == req.session.user._id.toString();
    res.render("user/profile", {
      title: `${user.username}`,
      user,
      isMe,
      mypostres: req.session.user.username,
      postres: user.postres,
      isAuth: req.session.isLogged,
      url: process.env.URL,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProfilePage };
