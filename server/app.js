const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
 
// Middleware
app.use(cors());
app.use(express.json());


// Test Routes
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message:"Youtube Clone API is running!",
    })
})

// Routes
app.use("/api/auth",authRoutes)

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message:"Route not found"
    })
})

module.exports = app