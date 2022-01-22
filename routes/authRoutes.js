const { Router } = require("express");
const router = Router();
const {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
} = require("../controllers/authControllers");

// GET
router.get("/login", getLoginPage);
router.get("/signup", getRegisterPage);

// POST
router.post("/signup", registerNewUser);

module.exports = router;
