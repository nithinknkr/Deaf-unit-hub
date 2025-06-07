const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');

// POST /api/feedback
router.post('/', auth, async (req, res) => {
  const { email, message } = req.body;
  try {
    const feedback = new Feedback({
      email,
      message,
      userId: req.user.id
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 