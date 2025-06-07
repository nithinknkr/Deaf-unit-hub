import React from 'react';
import AlphabetGrid from '../Components/AlphabetGrid';
import Dictionary from '../Components/Dictionary';
import backgroundImage from '../assets/9fa97cba-3f8b-4d6c-b4c9-704c22801a47.jpeg';

const Resources = () => {
  return (
    <main className="pt-20">
      <section
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center flex-col mb-12"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h2 className="text-5xl font-medium text-white mb-5">
            ASL Learning Hub
          </h2>
          <p className="text-2xl text-gray-300 mb-10 max-w-full">
            Your Ultimate Guide to American Sign Language Alphabets and Words with Video Tutorials
          </p>
          <a
            href="#dictionary"
            className="inline-block bg-orange-600 text-white px-5 py-3 rounded-md font-bold hover:bg-orange-700"
          >
            Dive into ASL
          </a>
        </div>
      </section>
      <AlphabetGrid />
      <Dictionary />
    </main>
  );
};

export default Resources;