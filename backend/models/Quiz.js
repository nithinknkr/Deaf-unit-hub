const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  quizName: { type: String, required: true },
  questions: [
    {
      num: { type: Number, required: true },
      question: { type: String, required: true },
      image: { type: String, required: true },
      answer: { type: String, required: true },
      options: [{ type: String, required: true }],
    },
  ],
});

module.exports = mongoose.model('Quiz', quizSchema);