const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Get all resources or filter by letter
router.get('/', async (req, res) => {
  try {
    const { letter } = req.query;
    const query = letter ? { letter: letter.toUpperCase() } : {};
    const resources = await Resource.find(query);
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;