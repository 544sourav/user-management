
const cloudinary = require("cloudinary").v2;
const User = require("../models/User");

// Controller to add a new user 
exports.addUser = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    //console.log("hloo");
    if (!name || !phone || !email || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //console.log("hloo");
    const result = await cloudinary.uploader.upload(req.file.path);
    //console.log("result", result);
    const newUser = await User.create({
      name,
      phone,
      email,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });
    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ 
        success:false,
        message: "Unable to add user", 
        error 
    });
  }
};

// Controller to fetch users
exports.getPaginatedUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch data",
      error,
    });
  }
};
