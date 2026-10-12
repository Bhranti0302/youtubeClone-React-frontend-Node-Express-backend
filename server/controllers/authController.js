const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const cookieOptions = require("../utils/cookieOptions");
const asyncHandler = require("../utils/asyncHandler");

// ============ LOGIN ============ //
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists.",
    });
  }

  // 2. Create the user
  const user = await User.create({
    name,
    email,
    password,
  });

  // 3. Generate token
  const token = generateToken(user._id);

  // 4. Send cookie
  res.cookie("token", token, cookieOptions);

  // 5. Send response
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ============ SIGNUP ============ //
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // 2.Check if password is correct
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // 3. Generate token
  const token = generateToken(user._id);

  // 4. Send Cookies
  res.cookie("token", token, cookieOptions);

  // 5. Send Response
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ============ LOGOUT USER ============ //
const logout = asyncHandler(async (req, res) => {
  // 1. Check if user is logged in
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Not logged in"
    })
  }

  // 2. Clear cookie
  res.clearCookie("token");

  // 3. Send response
  res.status(200).json({
    message:"User logged out successfully"
  })
})

module.exports = {
  register,
  login,
  logout
};
