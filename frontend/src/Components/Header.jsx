import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Handle scroll effect for header with direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' 
        : 'bg-transparent py-5'} ${
        scrollDirection === 'down' && scrolled 
          ? 'transform -translate-y-1 opacity-90' 
          : 'transform translate-y-0 opacity-100'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 max-w-6xl">
        <div 
          className="text-2xl font-bold text-orange-600 hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center" 
          onClick={() => navigate('/')}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">DeafUnityHub</span>
        </div>
        <nav className="hidden md:flex">
          <ul className="flex space-x-5">
            {[
              { path: '/', label: 'Home' },
              { path: '/resources', label: 'Resources' },
              { path: '/exercises', label: 'Exercises' },
              { path: '/feedback', label: 'Feedback' }
            ].map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`relative px-3 py-2 font-bold transition-all duration-300 group ${location.pathname === item.path ? 'text-orange-600' : 'text-gray-800 hover:text-orange-600'}`}
                >
                  {item.label}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transform transition-transform duration-300 ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-75'}`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-800 font-bold hover:text-orange-600 transition-colors relative group"
              >
                Login
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button with animation */}
        <button
          className="md:hidden text-gray-800 z-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 h-6 relative">
            <span 
              className={`absolute h-0.5 w-full bg-gray-800 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}
            ></span>
            <span 
              className={`absolute h-0.5 bg-gray-800 transform transition-all duration-300 ${isMenuOpen ? 'opacity-0 w-0' : 'opacity-100 w-full top-3'}`}
            ></span>
            <span 
              className={`absolute h-0.5 w-full bg-gray-800 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}
            ></span>
          </div>
        </button>
      </div>
      
      {/* Mobile menu with improved animation */}
      <div 
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-40 transform transition-all duration-500 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} md:hidden`}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 pt-16">
          {[
            { path: '/', label: 'Home' },
            { path: '/resources', label: 'Resources' },
            { path: '/exercises', label: 'Exercises' },
            { path: '/feedback', label: 'Feedback' }
          ].map((item, index) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`text-xl font-bold ${location.pathname === item.path ? 'text-orange-600' : 'text-gray-800'} transform transition-all duration-300 hover:scale-110 hover:text-orange-500`}
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="mt-8 bg-gradient-to-r from-orange-500 to-orange-700 text-white px-8 py-3 rounded-lg text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col space-y-4 mt-8 w-2/3 items-center">
              <Link
                to="/login"
                className="w-full text-center py-3 text-gray-800 font-bold border border-gray-300 rounded-lg transform transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-lg transform transition-all duration-300 hover:from-orange-600 hover:to-orange-800 hover:scale-105 hover:shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;