
import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { CONTENT_CATEGORIES } from '../constants';
import SectionTitle from './SectionTitle';

const MyContent: React.FC = () => {
  const location = useLocation();

  // useEffect for default navigation is removed as App.tsx's <Navigate> component handles it.
  // The :id part of the path in App.tsx (e.g. /lifestyle) will be matched
  // and the correct component will be rendered in the Outlet below.

  const baseTabClasses = "px-4 py-3 md:px-6 md:py-3 font-medium text-md md:text-lg rounded-t-lg transition-all duration-300 ease-in-out transform";
  const activeTabClasses = "bg-primary text-white dark:bg-pink-500 dark:text-white shadow-md scale-105";
  const inactiveTabClasses = "bg-pink-100 dark:bg-slate-700 text-primary-dark dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-slate-600 hover:scale-105";

  return (
    <section className="py-12 md:py-20 bg-secondary-light dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-8">
        <SectionTitle title="My Content" subtitle="Explore my vlogs, study tips & UGC portfolio" />
        
        <div className="mb-8 md:mb-12 flex flex-wrap justify-center gap-2 md:gap-4 border-b-2 border-pink-200 dark:border-slate-700 pb-4">
          {CONTENT_CATEGORIES.map((category) => (
            <NavLink
              key={category.id}
              // NavLink 'to' prop should be relative to its parent route in App.tsx
              // Since parent route is '/', these will resolve to '/lifestyle', '/study', etc.
              to={`/${category.path}`} 
              className={({ isActive }) => {
                // isActive will be true if the current path matches `/${category.path}`
                return `${baseTabClasses} ${isActive ? activeTabClasses : inactiveTabClasses}`;
              }}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 md:p-8 rounded-b-lg shadow-xl min-h-[400px]">
          {/* Outlet will render LifestyleVlogs, StudyContent, or UgcContent based on the current route */}
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default MyContent;
