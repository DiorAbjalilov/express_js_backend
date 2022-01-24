const { Router } = require("express");
const router = Router();
const {
  getPostersPage,
  addNewPosterPage,
  addNewPoster,
  getOnePoster,
  getEditPosterPage,
  updatePoster,
  getDeletePoster,
} = require("../controllers/posterControllers");
const upload = require("../utils/fileUpload");
const { protected } = require("../middlewares/auth");
// GET
router.get("/", getPostersPage);
router.get("/add", protected, addNewPosterPage);
router.get("/:id", getOnePoster);
router.get("/:id/edit", protected, getEditPosterPage);
// POST
router.post("/add", protected, upload.single("image"), addNewPoster);
router.post("/:id/edit", protected, updatePoster);
router.post("/:id/delete", protected, getDeletePoster);

module.exports = router;
