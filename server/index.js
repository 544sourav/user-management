// index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./router/User");
const DataBase = require("./config/database");
const cloudinary = require("./config/cloudinary");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// Database Connection
DataBase.connect();
//cloudinary connection
cloudinary.cloudinaryConnect();

// Routes
app.use("/api/v1", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h3>baseurl/api/v1 </h3>`);
});
