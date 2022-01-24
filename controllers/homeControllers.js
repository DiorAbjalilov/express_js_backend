// @route       GET  /
// @desc        Get home page
// @acsess      Public
const getHomePage = (req, res) => {
  res.render("home", {
    title: "OLX - Home page",
    user: req.session.user,
    isLogged: req.session.isLogged,
    url: process.env.URL,
  });
};

module.exports = { getHomePage };
