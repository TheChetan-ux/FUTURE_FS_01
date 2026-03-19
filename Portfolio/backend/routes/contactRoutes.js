const express = require("express");

const Contact = require("../models/Contact");

const router = express.Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/", async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const message = req.body.message?.trim();

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    if (message.length < 10) {
      return res.status(400).json({ message: "Message should be at least 10 characters long." });
    }

    const contact = await Contact.create({
      name,
      email,
      message
    });

    return res.status(201).json({
      message: "Contact form submitted successfully.",
      contact
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save contact form data." });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch contacts." });
  }
});

module.exports = router;
