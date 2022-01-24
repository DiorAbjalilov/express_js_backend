const { Router } = require("express");
const router = Router();
const {
  getLoginPage,
  getRegisterPage,
  registerNewUser,
  loginUser,
  logout,
} = require("../controllers/authControllers");
const { guest } = require("../middlewares/auth");

// GET
router.get("/login", guest, getLoginPage);
router.get("/signup", guest, getRegisterPage);
router.get("/logout", logout);

// POST
router.post("/signup", guest, registerNewUser);
router.post("/login", guest, loginUser);

module.exports = router;
