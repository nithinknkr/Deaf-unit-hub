const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  quizName: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuizResult', quizResultSchema);