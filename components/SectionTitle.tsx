
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-10 md:mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary dark:text-pink-400">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 md:mt-4 text-md md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 w-24 h-1 bg-pink-300 dark:bg-pink-600 mx-auto rounded-full"></div>
    </div>
  );
};

export default SectionTitle;
