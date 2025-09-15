const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Determine redirect URL based on role
    let redirectUrl = "https://auth.jatinsinghdev.tech/";
    if (user.role === "candidate") redirectUrl = "https://candidate.jatinsinghdev.tech";
    if (user.role === "hr") redirectUrl = "https://hr.jatinsinghdev.tech";
    if (user.role === "admin") redirectUrl = "https://admin.jatinsinghdev.tech";

    res.status(201).json({ message: "User registered successfully", redirectUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    let redirectUrl = "https://auth.jatinsinghdev.tech/";
    if (user.role === "candidate") redirectUrl = "https://candidate.jatinsinghdev.tech";
    if (user.role === "hr") redirectUrl = "https://hr.jatinsinghdev.tech";
    if (user.role === "admin") redirectUrl = "https://admin.jatinsinghdev.tech";

    res.json({ message: "Login successful", redirectUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// Current User
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getMe };
