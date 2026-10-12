const express = require("express");

const { register,login,logout } = require("../controllers/authController");

const router = express.Router();

// ================== PUBLIC ROUTE ==================

// Role => User Register
router.post("/register", register);

router.post("/login", login)

// ================== PUBLIC ROUTE ================== 

// Role => All Role logout 
router.get("/logout", logout);

module.exports = router;