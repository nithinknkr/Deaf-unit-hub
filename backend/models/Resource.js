const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  letter: {
    type: String,
    required: true,
    enum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  },
  word: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Resource', resourceSchema);