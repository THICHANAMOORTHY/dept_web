const express = require('express');
const router = express.Router();
const { prisma } = require('../config/db');

/**
 * Public POST /api/enquiries
 * Allows visitors to submit a contact/enquiry form without authentication.
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required.' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        message: message.trim(),
        status: 'New',
      },
    });

    res.status(201).json({ message: 'Your enquiry has been submitted successfully! We will get back to you soon.', id: enquiry.id });
  } catch (error) {
    console.error('Public enquiry submission error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
});

module.exports = router;
