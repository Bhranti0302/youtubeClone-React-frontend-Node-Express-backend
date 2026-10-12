const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name... "],
    minlength: 3,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please enter email."],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email."],
  },

  password: {
    type: String,
    required: [true, "Please enter password..."],
    minlength: 6,
    select: false,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
      "Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters",
    ],
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  profileImage: {
    url: String,
    public_id: String,
  },
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports=mongoose.model("User",userSchema)