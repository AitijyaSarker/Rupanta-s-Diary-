
import React from 'react';
import { Link } from 'react-router-dom';

const MarqueeBanner: React.FC = () => {
  const marqueeText = "✨ Save on YesStyle! Use Code: RUPANTA13 ✨ Click for a special discount! ✨";
  
  return (
    <div className="bg-primary dark:bg-pink-500 text-white overflow-hidden fixed top-16 w-full z-[60] h-8 group">
      <Link to="/#rewards" className="w-full h-full flex items-center">
        {/* The parent container uses flex to create a "train" of the child elements */}
        <div className="w-full flex whitespace-nowrap">
          {/* This is the first block of text. It will scroll from right to left. */}
          <div className="animate-marquee flex items-center">
            <span className="mx-8 text-sm font-medium group-hover:text-accent transition-colors duration-300">
              {marqueeText}
            </span>
            <span className="mx-8 text-sm font-medium group-hover:text-accent transition-colors duration-300" aria-hidden="true">
              {marqueeText}
            </span>
          </div>
          {/* This is the second, identical block that follows the first to create a seamless loop. */}
          <div className="animate-marquee flex items-center" aria-hidden="true">
            <span className="mx-8 text-sm font-medium group-hover:text-accent transition-colors duration-300">
              {marqueeText}
            </span>
            <span className="mx-8 text-sm font-medium group-hover:text-accent transition-colors duration-300" aria-hidden="true">
              {marqueeText}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MarqueeBanner;
