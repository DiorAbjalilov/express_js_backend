const User = require("../models/userModule");

// @route       GET  /profile/:username
// @desc        Users profile page
// @acsess      Private

const getProfilePage = async (req, res) => {
  try {
    const userProfile = await User.findOne({ username: req.params.username })
      .populate("postres")
      .lean();
    if (!userProfile) throw new Error("Bunday faydalanuvchi mavjud emas");

    let isMe = false;

    if (req.session.user) {
      isMe = userProfile._id == req.session.user._id.toString();
    }

    res.render("user/profile", {
      title: `${userProfile.username}`,
      user: req.session.user,
      userProfile,
      isMe,
      postres: userProfile.postres,
      isAuth: req.session.isLogged,
      url: process.env.URL,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getProfilePage };
