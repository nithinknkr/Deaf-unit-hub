import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import backgroundImage from '../assets/9d41a29f-62cb-4217-bdb4-4bb912acb041.jpeg';

const Exercises = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeRule, setActiveRule] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowRules(true);
  };

  const handleContinue = () => {
    setShowRules(false);
    setShowQuizzes(true);
  };

  const handleQuizSelect = (quizName) => {
    navigate(`/quiz/${quizName}`);
  };

  const rules = [
    "Each Quiz Consists of 5 questions.",
    "Each Question consists of 4 Options.",
    "For Each correct Answer your accuracy is increased by 20%.",
    "If your accuracy is less than 50% you have to write the same quiz again.",
    "If your accuracy is Greater than 50% you can go to next quiz."
  ];

  return (
    <div className="relative bg-cover bg-center min-h-screen flex items-center justify-center flex-col mt-20 mb-12 overflow-hidden" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-0"></div>
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-4">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6 text-shadow-lg">
            ASL <span className="text-orange-400">Quiz</span> Central
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Challenge Your Sign Language Skills with Interactive Quizzes
          </p>
          <button
            onClick={handleStartQuiz}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-transparent overflow-hidden rounded-lg"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-600 to-orange-800 opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="absolute inset-0 w-full h-full border border-white rounded-lg opacity-20"></span>
            <span className="relative">Start Quiz</span>
          </button>
        </div>
      </main>

      {/* Rules modal with enhanced animation */}
      {showRules && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20 animate-fadeIn">
          <div className="w-11/12 max-w-md bg-white rounded-xl p-6 shadow-2xl transform transition-all duration-500 animate-scaleIn">
            <h2 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 mb-6 font-bold text-center">Quiz Rules</h2>
            <div className="space-y-4">
              {rules.map((rule, index) => (
                <div 
                  key={index} 
                  className={`flex items-start p-3 rounded-lg transition-all duration-300 ${activeRule === index ? 'bg-orange-50 scale-105' : 'hover:bg-orange-50'}`}
                  onMouseEnter={() => setActiveRule(index)}
                  onMouseLeave={() => setActiveRule(null)}
                >
                  <span className="bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">{index + 1}</span>
                  <p className="text-base text-gray-700">{rule}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
              <button
                onClick={() => setShowRules(false)}
                className="px-5 py-2.5 bg-white text-orange-600 border-2 border-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Exit
              </button>
              <button
                onClick={handleContinue}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
              >
                Continue
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quizzes modal with enhanced animation */}
      {showQuizzes && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30 animate-fadeIn">
          <div className="w-11/12 max-w-lg bg-white rounded-xl p-6 shadow-2xl transform transition-all duration-500 animate-scaleIn">
            <h2 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 mb-8 font-bold text-center">Select a Quiz</h2>
            <ul className="space-y-4">
              {['Quiz-1', 'Quiz-2'].map((quiz, index) => (
                <li key={quiz} className="transform transition-all duration-300 hover:scale-105" style={{ transitionDelay: `${index * 100}ms` }}>
                  <button
                    onClick={() => handleQuizSelect(quiz)}
                    className="w-full bg-white border-2 border-gray-200 text-gray-700 font-medium py-4 px-5 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3">{index + 1}</span>
                      <span className="text-lg group-hover:text-orange-600 transition-colors">{quiz}</span>
                    </div>
                    <div className="bg-orange-100 text-orange-600 rounded-full p-2 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-orange-500 group-hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowQuizzes(false)}
              className="block w-36 mx-auto mt-8 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-lg py-3 text-lg font-semibold hover:from-orange-600 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;