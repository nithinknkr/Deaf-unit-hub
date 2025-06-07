const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');

// Seed quizzes (run once manually or via a script)
router.post('/seed', async (req, res) => {
  try {
    const quizzes = [
      {
        quizName: 'Quiz-1',
        questions: [
          {
            num: 1,
            question: 'Identify the sign in the image',
            image: '/assets/Abandon.jpg',
            answer: 'D. Abandon',
            options: ['A. Above', 'B. Acadamic', 'C. Blow', 'D. Abandon'],
          },
          {
            num: 2,
            question: 'Identify the sign in the image',
            image: '/assets/accomplish-02-320.jpg',
            answer: 'C. Accomplish',
            options: ['A. Arrange', 'B. Help', 'C. Accomplish', 'D. Wow'],
          },
          {
            num: 3,
            question: 'Identify the sign in the image',
            image: '/assets/Screenshot 2024-06-11 185208.png',
            answer: 'C. Active',
            options: ['A. Action', 'B. comedy', 'C. Active', 'D. Act'],
          },
          {
            num: 4,
            question: 'Identify the sign in the image',
            image: '/assets/Screenshot 2024-06-11 190226.png',
            answer: 'B. Agree',
            options: ['A. Below', 'B. Agree', 'C. Suprize', 'D. Angry'],
          },
          {
            num: 5,
            question: 'Identify the sign in the image',
            image: '/assets/delicious.png',
            answer: 'A. Delicious',
            options: ['A. Delicious', 'B. Sorry', 'C. see you later', 'D. Dark'],
          },
        ],
      },
      {
        quizName: 'Quiz-2',
        questions: [
          {
            num: 1,
            question: 'Identify the sign in the image',
            image: '/assets/After.png',
            answer: 'A. After',
            options: ['A. After', 'B. Grow', 'C. Okay', 'D. Hello'],
          },
          {
            num: 2,
            question: 'Identify the sign in the image',
            image: '/assets/Medicine.png',
            answer: 'C. Medicine',
            options: ['A. meditate', 'B. floor', 'C. Medicine', 'D. Meeting'],
          },
          {
            num: 3,
            question: 'Identify the sign in the image',
            image: '/assets/past or later.png',
            answer: 'B. Past',
            options: ['A. Password', 'B. Past', 'C. Young', 'D. future'],
          },
          {
            num: 4,
            question: 'Identify the sign in the image',
            image: '/assets/person.png',
            answer: 'D. Person',
            options: ['A. yes', 'B. Your', 'C. Super', 'D. Person'],
          },
          {
            num: 5,
            question: 'Identify the sign in the image',
            image: '/assets/plant seeds.png',
            answer: 'D. Plant',
            options: ['A. No', 'B. Quick', 'C. Pain', 'D. Plant'],
          },
        ],
      },
    ];

    await Quiz.deleteMany({});
    await Quiz.insertMany(quizzes);
    res.status(201).json({ message: 'Quizzes seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, 'quizName');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific quiz
router.get('/:quizName', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ quizName: req.params.quizName });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit quiz result
router.post('/submit', auth, async (req, res) => {
  try {
    const { quizName, score, totalQuestions } = req.body;
    const accuracy = (score / totalQuestions) * 100;
    const quizResult = new QuizResult({
      username: req.user.username,
      quizName,
      score,
      totalQuestions,
      accuracy,
    });
    await quizResult.save();
    res.status(201).json({ message: 'Quiz result submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user quiz results
router.get('/results/:username', auth, async (req, res) => {
  try {
    const results = await QuizResult.find({ username: req.params.username });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;