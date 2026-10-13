const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("./../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  // 1. Get token
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1]
  }

  // 2. No token
  if (!token) {
    res.status(400).json({
      message: "No authorized, no token"
    })
  }

  // 3. Verify
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(400).json({
        message: "No authorized, no token",
      });
    }

    req.user = user
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
})



module.exports = { protect };



