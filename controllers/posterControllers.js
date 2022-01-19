const {
  addNewPosterToDB,
  getAllPosters,
  getPosterById,
} = require("../db/poster");
const { v4 } = require("uuid");

// @route       GET  /posters/add
// @desc        Get all posters
// @acsess      Public
const getPostersPage = async (req, res) => {
  const posters = await getAllPosters();
  res.render("posters/posters", {
    title: "OLX - Posters page",
    posters,
    url: process.env.URL,
  });
};

// @route       GET  /posters/:id
// @desc        Get one poster by id
// @acsess      Public
const getOnePoster = async (req, res) => {
  try {
    const poster = await getPosterById(req.params.id);
    res.render("posters/one", {
      title: poster.title,
      poster,
      url: process.env.URL,
    });
  } catch (error) {
    console.log(error);
  }
};
// @route       GET  /posters/add
// @desc        Get adding posters
// @acsess      Private
const addNewPosterPage = (req, res) => {
  res.render("posters/add-poster.handlebars", {
    title: "OLX - Add New Poster page",
    url: process.env.URL,
  });
};

// @route       POST  /posters/add
// @desc        Add new poster
// @acsess      Private
const addNewPoster = async (req, res) => {
  const poster = {
    id: v4(),
    title: req.body.title,
    amount: req.body.amount,
    region: req.body.region,
    image: req.body.image,
    description: req.body.description,
  };
  await addNewPosterToDB(poster);
  res.redirect("/");
};

// @route       GET  /posters/:id/edit
// @desc        Get edit posters page
// @acsess      Private (Own)

const getEditPosterPage = async (req, res) => {
  res.render("posters/edit-poster", {
    title: "Edit page",
    url: process.env.URL,
  });
};

module.exports = {
  getPostersPage,
  addNewPosterPage,
  addNewPoster,
  getOnePoster,
  getEditPosterPage,
};
