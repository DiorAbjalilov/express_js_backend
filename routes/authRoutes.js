const { Router } = require("express");
const router = Router();
const {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
  loginUser,
  logout,
} = require("../controllers/authControllers");

// GET
router.get("/login", getLoginPage);
router.get("/signup", getRegisterPage);
router.get("/logout", logout);

// POST
router.post("/signup", registerNewUser);
router.post("/login", loginUser);

module.exports = router;
