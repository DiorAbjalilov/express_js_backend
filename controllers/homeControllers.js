// @route       GET  /
// @desc        Get home page
// @acsess      Public
const getHomePage = (req, res) => {
  res.render("home", { title: "OLX - Home page", url: process.env.URL });
};

module.exports = { getHomePage };
