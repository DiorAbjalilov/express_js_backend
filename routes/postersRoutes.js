const { Router } = require("express");
const router = Router();
const {
  getPostersPage,
  addNewPosterPage,
  addNewPoster,
  getOnePoster,
  getEditPosterPage,
  updatePoster,
} = require("../controllers/posterControllers");

// GET
router.get("/", getPostersPage);
router.get("/add", addNewPosterPage);
router.get("/:id", getOnePoster);
router.get("/:id/edit", getEditPosterPage);
// POST
router.post("/add", addNewPoster);
router.post("/:id/edit", updatePoster);

module.exports = router;
