import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Feedback from './pages/Feedback';
import Resources from './pages/Resources';
import Header from './Components/Header';
import Exercises from './Components/Exercises';
import Quiz from './Components/Quiz';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/quiz/:quizName" element={<Quiz />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;