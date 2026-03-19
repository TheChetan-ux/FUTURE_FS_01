const connectDb = require("./_lib/connectDb");
const Contact = require("../backend/models/Contact");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDb();

    if (req.method === "GET") {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json(contacts);
    }

    if (req.method === "POST") {
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
    }

    return res.status(405).json({ message: "Method not allowed." });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while processing the contact request."
    });
  }
};
