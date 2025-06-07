import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please sign in to submit feedback');
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/feedback`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ 
          email: user.email,
          message 
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Thank you for your feedback!');
        setMessage('');
      } else {
        console.error('Feedback error:', data);
        setError(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Feedback fetch error:', err);
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
        {success && <div className="text-green-600 mb-2">{success}</div>}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="mb-3">
          <label className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            value={user.email || ''} 
            disabled 
            className="w-full p-2 border rounded bg-gray-100" 
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 mb-2">Your Feedback</label>
          <textarea 
            placeholder="Please share your thoughts..." 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
            className="w-full mb-3 p-2 border rounded h-32" 
            required 
          />
        </div>
        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;