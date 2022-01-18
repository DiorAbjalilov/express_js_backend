// @route       GET  /posters
// @desc        Get posters page
// @acsess      Public
const getPostersPage = (req, res) => {
  res.render("posters/posters", {
    title: "OLX - Posters page",
    url: process.env.URL,
  });
};

const addNewPosterPage = (req, res) => {
  res.render("posters/add-poster.handlebars", {
    title: "OLX - Add New Poster page",
    url: process.env.URL,
  });
};

const addNewPoster = (req, res) => {
  console.log(req.body);
};

module.exports = { getPostersPage, addNewPosterPage, addNewPoster };
