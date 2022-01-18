const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("posters", { title: "OLX - Posters page" });
});

module.exports = router;
