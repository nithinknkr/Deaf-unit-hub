import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const { quizName } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${apiUrl}/api/quizzes/${quizName}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError('Failed to load quiz. Please try again.');
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizName, navigate]);

  const handleOptionClick = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);
    const correctAnswer = questions[currentQuestion].answer;
    if (option === correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextClick = () => {
    setAnimation('slide-out');
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        submitQuizResult();
      }
      setAnimation('slide-in');
    }, 300);
  };

  const submitQuizResult = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(
        `${apiUrl}/api/quizzes/submit`,
        { quizName, score, totalQuestions: questions.length },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
    } catch (error) {
      console.error('Error submitting quiz result:', error);
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setAnimation('slide-in');
  };

  const handleNextQuiz = () => {
    const nextQuiz = quizName === 'Quiz-1' ? 'Quiz-2' : 'Quiz-1';
    navigate(`/quiz/${nextQuiz}`);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#503e38]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#503e38] p-4 text-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
        <p>{error}</p>
      </div>
      <button 
        onClick={() => navigate('/exercises')} 
        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Back to Exercises
      </button>
    </div>
  );
  
  if (questions.length === 0) return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#503e38] p-4 text-center">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-4">
        <p>No questions found for this quiz.</p>
      </div>
      <button 
        onClick={() => navigate('/exercises')} 
        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Back to Exercises
      </button>
    </div>
  );

  const current = questions[currentQuestion];
  const scorePercentage = (score / questions.length) * 100;
  const progressWidth = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#503e38] p-4">
      {!showResult ? (
        <div className={`bg-[#292929] w-full max-w-lg rounded-2xl p-6 shadow-2xl flex flex-col h-[600px] transition-all duration-300 ${animation}`}>
          <h1 className="text-2xl text-center bg-gradient-to-r from-transparent via-[#f55820] to-transparent rounded-lg py-2 mb-4 text-white">
            {quizName}
          </h1>
          <div className="flex justify-between mb-4 text-sm text-white">
            <span>Score: {score}/{questions.length}</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-4 mb-4 overflow-hidden">
            <div 
              className="bg-[#f86a18] h-4 rounded-full transition-all duration-500" 
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-full max-h-64 mb-4 overflow-hidden rounded-lg">
              <img 
                src={current.image} 
                alt="Sign" 
                className="w-full object-contain rounded-lg transition-transform duration-300 hover:scale-105" 
              />
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Question {currentQuestion + 1}
              </div>
            </div>
            <h2 className="text-lg text-white mb-4 hover:text-[#f7955d] transition-colors">{current.question}</h2>
            <div className="w-full">
              {current.options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`p-3 bg-[#313131] border-2 border-gray-600 rounded-full mb-3 cursor-pointer hover:bg-gray-500 hover:border-[#f86a18] transition-all transform hover:scale-102 ${selectedOption ? 'cursor-default' : 'hover:translate-x-1'} ${
                    selectedOption === option
                      ? option === current.answer
                        ? 'bg-green-600 border-green-400'
                        : 'bg-red-600 border-red-400'
                      : selectedOption && option === current.answer
                      ? 'bg-green-600 border-green-400'
                      : ''
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-4 items-center">
            <span className="text-sm text-white">{currentQuestion + 1} of {questions.length} Questions</span>
            <button
              onClick={handleNextClick}
              disabled={!selectedOption}
              className={`w-24 h-10 bg-[#f86a18] text-white rounded-lg transition-all duration-300 ${!selectedOption ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e64721] hover:scale-105'}`}
            >
              {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#2c2c2c] border-4 border-[#f86a18] rounded-2xl p-8 text-center max-w-sm animate-scaleIn">
          <h2 className="text-3xl text-gray-300 mb-4">Quiz Result!</h2>
          <div className="relative w-36 h-36 mx-auto mb-4">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="75"
                cy="75"
                r="70"
                stroke="#333"
                strokeWidth="10"
                fill="none"
              />
              <circle
                className="circle-progress"
                cx="75"
                cy="75"
                r="70"
                stroke="#f86a18"
                strokeWidth="10"
                fill="none"
                strokeDasharray="440"
                strokeDashoffset={440 - (scorePercentage / 100) * 440}
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl text-[#f86a18]">
              {scorePercentage}%
            </div>
          </div>
          <p className="text-xl text-white mb-4">Your Score {score} out of {questions.length}</p>
          <div className="mt-6">
            {scorePercentage >= 50 ? (
              <button
                onClick={handleNextQuiz}
                className="w-44 h-14 border-2 border-[#f86a18] rounded-lg bg-transparent text-white text-xl hover:bg-[#f86a18] transition-all transform hover:scale-105"
              >
                Next Quiz
              </button>
            ) : (
              <button
                onClick={handleTryAgain}
                className="w-44 h-14 border-2 border-[#f86a18] rounded-lg bg-transparent text-white text-xl hover:bg-[#f86a18] transition-all transform hover:scale-105"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;