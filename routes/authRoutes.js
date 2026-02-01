const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Kullanıcı kayıt
router.post("/register", registerUser);

// Kullanıcı giriş
router.post("/login", loginUser);

module.exports = router;
