const express = require("express");
const router = express.Router();
const voter = require("../models/Voter");
const approved = require("../models/ApprovedVoter");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const { encryptData, decryptData } = require("../utils/encryption.js");

// Route 1: Create a new voter
router.post(
  "/create",
  [
    body("voterId", "Enter a valid Voter ID").isLength({ min: 10, max: 10 }),
    body("aadharNumber", "Enter a valid Aadhar Number").isLength({
      min: 12,
      max: 12,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("phoneNumber", "Enter a valid phone number").isLength({ min: 10 }),
    body("dateOfBirth", "Enter a valid date of birth").isDate(),
  ],
  async (req, res) => {
    const {
      voterFirstName,
      voterLastName,
      email,
      phoneNumber,
      voterId,
      aadharNumber,
      imgUrl,
    } = req.body;

    try {
      // Check if a user with the same voterId or aadharNumber already exists
      const existingUser = await voter.findOne({
        $or: [{ voterId: voterId }, { aadharNumber: aadharNumber }],
      });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // If no existing user found, create a new voter
      const newVoter = new voter({
        voterId,
        voterFirstName,
        voterLastName,
        aadharNumber,
        email,
        phoneNumber,
        imgUrl,
      });

      await newVoter.save();
      res.status(201).json({ newVoter, message: "Registered Successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//Route 2: Voter Login
router.post("/login", async (req, res) => {
  try {
    let { email, voterId } = req.body; // Destructure email and voterId from req.body

    // Query the database with the original data
    let user = await approved.findOne({ email, voterId });

    if (!user) {
      return res.status(400).json({ error: "Voter not Found" });
    } else {
      return res.status(200).json({ message: "Voter Found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
module.exports = router;
