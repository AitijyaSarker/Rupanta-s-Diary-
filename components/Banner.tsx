import React from 'react';
import { Link } from 'react-router-dom';
import { CREATOR_NAME, CHANNEL_NAME } from '../constants';
import { TypeAnimation } from 'react-type-animation';

const Banner: React.FC = () => {
  return (
    <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-pink-300 via-primary-light to-secondary-light dark:from-pink-700 dark:via-primary-dark dark:to-slate-800 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10" 
        style={{ backgroundImage: "url('https://picsum.photos/seed/bannerbg/1920/1080')" }}
      ></div>
      
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>

      <div className="relative z-10 p-6 md:p-12 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white dark:text-pink-100 mb-4 shadow-md">
          Welcome to <span className="text-pink-600 dark:text-secondary">{CHANNEL_NAME}</span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-white dark:text-pink-200 mb-8 shadow-sm">
          By {CREATOR_NAME}
        </p>

        {/* ✅ Typing animation here */}
        <div className="text-md sm:text-lg md:text-xl text-white dark:text-pink-200 mb-8 max-w-xl mx-auto">
          <TypeAnimation
            sequence={[
              "Exploring lifestyle, study, and authentic UGC.",
              2000,
              "Let's create something beautiful together!",
              2000,
            ]}
            wrapper="p"
            speed={50}
            repeat={Infinity}
          />
        </div>

        <Link
          to="/#collaborate"
          className="px-8 py-3 bg-primary hover:bg-primary-dark text-white dark:bg-pink-500 dark:hover:bg-pink-600 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
        >
          Let's Collaborate
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 dark:bg-pink-500/10 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 dark:bg-pink-500/10 rounded-full opacity-50 animate-pulse"></div>
    </div>
  );
};

export default Banner;
