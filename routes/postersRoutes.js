const { Router } = require("express");
const router = Router();
const {
  getPostersPage,
  addNewPosterPage,
  addNewPoster,
} = require("../controllers/posterControllers");

router.get("/", getPostersPage);
router.get("/add", addNewPosterPage);
// POST
router.post("/add", addNewPoster);

module.exports = router;
