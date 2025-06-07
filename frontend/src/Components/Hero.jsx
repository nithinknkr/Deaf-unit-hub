import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/Screenshot 2024-06-08 125503.png';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center flex-col mt-20 mb-12 overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 transition-opacity duration-1000"></div>
      <div className={`relative z-10 text-center max-w-6xl mx-auto px-4 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-5 leading-tight">
          Empowering the Deaf Community Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 font-bold">Inclusive Learning</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-full">
          Experience personalized American Sign Language (ASL) education with our interactive platform. Learn, engage, and grow in a supportive digital environment designed for you.
        </p>
        <a 
          href="#about" 
          className="inline-block bg-gradient-to-r from-orange-500 to-orange-700 text-white px-6 py-4 rounded-md font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-orange-600 hover:to-orange-800 relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-orange-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          <span className="relative z-10">Explore Our Resources</span>
        </a>
      </div>
      
      {/* Enhanced animated scroll indicator */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center">
          <span className="text-white/80 text-sm mb-2">Scroll to discover</span>
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mt-1"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-orange-500/30 rounded-full animate-pulse hidden md:block"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-orange-500/20 rounded-full animate-pulse hidden md:block" style={{animationDelay: '1s'}}></div>
    </section>
  );
}

export default Hero;