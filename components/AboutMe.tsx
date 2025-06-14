
import React from 'react';
import { CREATOR_NAME } from '../constants';
import SectionTitle from './SectionTitle';

const AboutMe: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionTitle title="About Me" subtitle={`Get to know ${CREATOR_NAME}`} />
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <img
              src="https://i.postimg.cc/8CmByTSM/Whats-App-Image-2025-06-14-at-23-56-59-e72231b3.jpg" 
              alt={CREATOR_NAME}
              className="rounded-full shadow-xl mx-auto w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-primary-light dark:border-primary-dark animate-subtle-glow-custom"
            />
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold text-primary dark:text-primary-light mb-4 font-display">
              Hey, I'm {CREATOR_NAME}!
            </h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              Welcome to my little corner of the internet! I'm passionate about sharing my journey through lifestyle vlogs, offering helpful study content, and creating authentic User-Generated Content (UGC) for brands I love. 
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              My goal with <span className="font-semibold text-primary-dark dark:text-pink-400">Rupanta's Diary</span> is to inspire, connect, and bring a touch positivity to your day. I believe in the power of storytelling and authentic connection, and I'm excited to share my experiences with you.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Whether you're here for study tips, a peek into my daily life, or to explore potential collaborations, I'm so glad to have you! Feel free to look around and reach out if you'd like to connect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
