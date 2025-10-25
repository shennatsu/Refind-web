const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const jwtSecret = process.env.JWT_SECRET || "super-secret-refind";
const jwtExpire = process.env.JWT_EXPIRES_IN || "7d";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name: username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Username, email, dan password wajib diisi",
      });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({
        status: "error",
        message: "Email sudah digunakan",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name: username, 
      email: email.toLowerCase(),
      passwordHash,
      role: role === "admin" ? "admin" : "user",
    });

    await user.save();

    res.status(201).json({
      status: "success",
      message: "Registrasi berhasil",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan server",
      detail: err.message,
    });
  }
});

/* =========================================================
   🔹 LOGIN (pakai email atau username)
========================================================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email/Username dan password wajib diisi",
      });
    }

    // Bisa login pakai email ATAU username
    const user = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { name: { $regex: new RegExp("^" + email + "$", "i") } }, // case-insensitive
      ],
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User tidak ditemukan",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpire }
    );

    res.json({
      status: "success",
      message: "Login berhasil",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan server",
    });
  }
});

module.exports = router;
