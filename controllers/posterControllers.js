const Poster = require("../models/posterModel");
const User = require("../models/userModule");
const filtering = require("../utils/filtering");

// @route       GET  /posters/add
// @desc        Get all posters
// @acsess      Public
const getPostersPage = async (req, res) => {
  try {
    const pagelimit = 10;
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const total = await Poster.countDocuments();

    // Redirect if queires [page, limit] doesn't exist
    if (req.url === "/") {
      return res.redirect(`?page=1&limit=${pagelimit}`);
    }

    if (req.query.search) {
      const { search } = req.query;
      const posters = await Poster.searchPartial(search, (err, data) => {
        if (err) throw new Error();
      }).lean();
      return res.status(200).render("posters/searchResults", {
        title: "Search results page",
        posters: posters.reverse(),
        user: req.session.user,
        querySearch: req.query.search,
        url: process.env.URL,
      });
    }

    if (!req.query.page || !req.query.limit) {
      const { category, from, to, region } = req.query;
      const filterings = filtering(category, from, to, region);
      const posters = await Poster.find(filterings).lean();
      return res.render("posters/searchResults", {
        title: "Filter results page",
        posters: posters.reverse(),
        user: req.session.user,
        querySearch: req.query.search,
        url: process.env.URL,
      });
    }

    const posters = await Poster.find()
      .skip(page * limit - limit)
      .limit(limit)
      .lean();
    return res.render("posters/posters", {
      title: "OLX - Posters page",
      pagination: {
        page,
        limit,
        pageCount: Math.ceil(total / limit),
      },
      posters: posters.reverse(),
      user: req.session.user,
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
    const poster = await Poster.findByIdAndUpdate(
      req.params.id,
      { $inc: { visits: 1 } },
      { new: true }
    )
      .populate("author")
      .lean();
    return res.render("posters/one", {
      title: poster.title,
      poster,
      author: poster.author,
      user: req.session.user,
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
  return res.render("posters/add-poster", {
    title: "OLX - Add New Poster page",
    user: req.session.user,
    url: process.env.URL,
  });
};

// @route       POST  /posters/add
// @desc        Add new poster
// @acsess      Private
const addNewPoster = async (req, res) => {
  try {
    const newPoster = new Poster({
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      image: "uploads/" + req.file.filename,
      description: req.body.description,
      author: req.session.user._id,
    });
    await User.findByIdAndUpdate(
      req.session.user._id,
      {
        $push: { postres: newPoster._id },
      },
      { new: true, upsert: true }
    );
    await newPoster.save((err, posterSaved) => {
      if (err) throw err;
      const posterId = posterSaved._id;
      res.redirect("/posters/" + posterId);
    });
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
