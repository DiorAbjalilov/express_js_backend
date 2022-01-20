const Poster = require("../models/posterModel");
const {
  addNewPosterToDB,
  getAllPosters,
  getPosterById,
  editPosterById,
  deletePosterById,
} = require("../db/poster");
const { v4 } = require("uuid");

// @route       GET  /posters/add
// @desc        Get all posters
// @acsess      Public
const getPostersPage = async (req, res) => {
  try {
    const posters = await Poster.find().lean();
    res.render("posters/posters", {
      title: "OLX - Posters page",
      posters: posters.reverse(),
      url: process.env.URL,
    });
  } catch (err) {
    console.log(err);
  }
};

// @route       GET  /posters/:id
// @desc        Get one poster by id
// @acsess      Public
const getOnePoster = async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id).lean();
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
  try {
    const poster = {
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      image: req.body.image,
      description: req.body.description,
    };
    await Poster.create(poster);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

// @route       GET  /posters/:id/edit
// @desc        Get edit posters page
// @acsess      Private (Own)

const getEditPosterPage = async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id).lean();
    res.render("posters/edit-poster", {
      title: "Edit page",
      url: process.env.URL,
      poster,
    });
  } catch (error) {
    console.log(error);
  }
};

// @route       POST  /posters/:id/edit
// @desc        POST posters by id
// @acsess      Private (Own)

const updatePoster = async (req, res) => {
  try {
    const editedPoster = {
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      image: req.body.image,
      description: req.body.description,
    };
    await Poster.findByIdAndUpdate(req.params.id, editedPoster);
    res.redirect("/posters");
  } catch (error) {
    console.log(error);
  }
};

// @route       GET  /posters/:id/delete
// @desc        Get delete posters page
// @acsess      Private (Own)

const getDeletePoster = async (req, res) => {
  try {
    await Poster.findByIdAndRemove(req.params.id);
    res.redirect("/posters");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPostersPage,
  addNewPosterPage,
  addNewPoster,
  getOnePoster,
  getEditPosterPage,
  updatePoster,
  getDeletePoster,
};
