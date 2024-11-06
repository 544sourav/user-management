
const express = require("express");
const multer = require("../utils/multer");
const { addUser, getPaginatedUsers } = require("../controllers/User");

const router = express.Router();

// Route to add a new user
router.post("/add", multer.single("image"), addUser);

// Route to fetch users
router.get("/", getPaginatedUsers);

module.exports = router;
