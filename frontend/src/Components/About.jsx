import React, { useEffect, useState, useRef } from 'react';

function About() {
  const [visibleSections, setVisibleSections] = useState({
    resources: false,
    exercises: false,
    feedback: false
  });
  
  const resourcesRef = useRef(null);
  const exercisesRef = useRef(null);
  const feedbackRef = useRef(null);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.dataset.section]: true
          }));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (resourcesRef.current) observer.observe(resourcesRef.current);
    if (exercisesRef.current) observer.observe(exercisesRef.current);
    if (feedbackRef.current) observer.observe(feedbackRef.current);
    
    return () => {
      if (resourcesRef.current) observer.unobserve(resourcesRef.current);
      if (exercisesRef.current) observer.unobserve(exercisesRef.current);
      if (feedbackRef.current) observer.unobserve(feedbackRef.current);
    };
  }, []);

  return (
    <div id="about" className="py-16 px-5 max-w-7xl mx-auto">
      <div 
        ref={resourcesRef}
        data-section="resources"
        className={`mb-16 bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-700 ${visibleSections.resources ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="bg-gradient-to-r from-orange-500 to-orange-700 h-2"></div>
        <div className="p-8">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            Resources
          </h1>
          <p className="text-lg text-gray-600 mb-5 leading-relaxed">
            Our website offers a rich collection of resources, including tutorial videos for learning American Sign Language (ASL). Users can access a comprehensive alphabet dictionary to enhance their vocabulary and understanding of ASL. These resources are designed to provide a solid foundation in ASL, supporting both beginners and advanced learners.
          </p>
          <div className="flex justify-center mt-6">
            <a href="/resources" className="px-6 py-3 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors duration-300 flex items-center group">
              Explore Resources
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div 
        ref={exercisesRef}
        data-section="exercises"
        className={`mb-16 bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-700 ${visibleSections.exercises ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        style={{ transitionDelay: '200ms' }}
      >
        <div className="bg-gradient-to-r from-orange-500 to-orange-700 h-2"></div>
        <div className="p-8">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Exercises
          </h1>
          <p className="text-lg text-gray-600 mb-5 leading-relaxed">
            To reinforce learning, we provide interactive exercises that include a variety of quizzes. These quizzes are designed to test and improve users' knowledge of ASL. Quiz results are stored in our database, allowing users to track their progress and identify areas for improvement.
          </p>
          <div className="flex justify-center mt-6">
            <a href="/exercises" className="px-6 py-3 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors duration-300 flex items-center group">
              Try Exercises
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div 
        ref={feedbackRef}
        data-section="feedback"
        className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-700 ${visibleSections.feedback ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="bg-gradient-to-r from-orange-500 to-orange-700 h-2"></div>
        <div className="p-8">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
            <svg className="w-8 h-8 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            Feedback Form
          </h1>
          <p className="text-lg text-gray-600 mb-5 leading-relaxed">
            We value user feedback to continually improve our website's functionality and content. Users can fill out a feedback form to share their experiences, suggestions, and any issues they encounter. All feedback is stored in our database and reviewed to ensure we meet the needs of our community effectively.
          </p>
          <div className="flex justify-center mt-6">
            <a href="/feedback" className="px-6 py-3 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors duration-300 flex items-center group">
              Share Feedback
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;