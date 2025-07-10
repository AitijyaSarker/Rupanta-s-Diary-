// MyContent.tsx
import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { CONTENT_CATEGORIES } from '../constants';
import SectionTitle from './SectionTitle';

const MyContent: React.FC = () => {
  const { pathname } = useLocation();

  // Jump to the content section on tab change
  useEffect(() => {
    if (pathname !== '/') {
      const section = document.getElementById('content');
      if (section) {
        section.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
  }, [pathname]);

  const baseTabClasses =
    'px-4 py-3 md:px-6 md:py-3 font-medium text-md md:text-lg rounded-t-lg transition-all duration-300 ease-in-out transform';
  const activeTabClasses =
    'bg-primary text-white dark:bg-pink-500 dark:text-white shadow-md scale-105';
  const inactiveTabClasses =
    'bg-pink-100 dark:bg-slate-700 text-primary-dark dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-slate-600 hover:scale-105';

  return (
    <section
      id="content"
      className="bg-secondary-light dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <SectionTitle
          title="My Content"
          subtitle="Explore my vlogs, study tips & UGC portfolio"
        />

        <div className="mb-8 md:mb-12 flex flex-wrap justify-center gap-2 md:gap-4 border-b-2 border-pink-200 dark:border-slate-700 pb-4">
          {CONTENT_CATEGORIES.map((category) => (
            <NavLink
              key={category.id}
              to={`/${category.path}`}
              className={({ isActive }) =>
                `${baseTabClasses} ${isActive ? activeTabClasses : inactiveTabClasses}`
              }
            >
              {category.name}
            </NavLink>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 md:p-8 rounded-b-lg shadow-xl min-h-[400px]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default MyContent;
