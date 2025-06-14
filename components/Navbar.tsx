import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS, CHANNEL_NAME, SOCIAL_LINKS, CONTENT_CATEGORIES } from '../constants';
import { MenuIcon, CloseIcon, MoonIcon, SunIcon } from './icons/GenericIcons';
import { SocialLink } from '../types';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const location = useLocation();

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setIsDarkMode(isDark);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinkBaseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 block md:inline-block text-center md:text-left";
  const navLinkActiveClasses = "bg-primary text-white dark:bg-pink-500 dark:text-slate-900";
  const navLinkInactiveClasses = "text-slate-700 dark:text-slate-300 hover:bg-pink-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white";

  const getNavLinkClassName = (itemPath: string, itemName: string) => {
    let isActuallyActive = false;
    const currentPathname = location.pathname;
    const currentHash = location.hash;

    const onAnyContentSubpage = CONTENT_CATEGORIES.some(cat => currentHash === `#/${cat.path}`);

    if (itemName === 'Home') {
      isActuallyActive = currentPathname === '/' && (currentHash === '' || currentHash === '#');
    } else if (itemName === 'My Content') {
      const isMyContentHashActive = currentPathname === '/' && currentHash === '#/content';
      isActuallyActive = isMyContentHashActive || onAnyContentSubpage;
    } else if (itemPath.startsWith('/#')) {
      const intendedHashSuffix = itemPath.substring(2);
      let actualHashSuffix = '';
      if (currentHash.startsWith('#/')) {
        actualHashSuffix = currentHash.substring(2);
      } else if (currentHash.startsWith('#')) {
        actualHashSuffix = currentHash.substring(1);
      }
      isActuallyActive = currentPathname === '/' && actualHashSuffix === intendedHashSuffix;
    }

    return `${navLinkBaseClasses} ${isActuallyActive ? navLinkActiveClasses : navLinkInactiveClasses}`;
  };

  return (
    <nav className="bg-secondary-light/80 dark:bg-slate-800/80 backdrop-blur-md shadow-md fixed w-full z-50 transition-colors duration-300 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            {/* ✅ Profile Picture */}
            <img
              src="https://i.postimg.cc/8CmByTSM/Whats-App-Image-2025-06-14-at-23-56-59-e72231b3.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover shadow-md"
            />
            <Link to="/" onClick={closeMobileMenu} className="text-2xl font-display font-bold text-primary dark:text-pink-400">
              {CHANNEL_NAME}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMobileMenu}
                end={item.path === '/'}
                className={getNavLinkClassName(item.path, item.name)}
              >
                {item.name}
              </NavLink>
            ))}

            {/* 🌗 Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full hover:bg-pink-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            {/* Social Icons */}
            <div className="flex space-x-2 pl-1">
              {SOCIAL_LINKS.slice(0, 2).map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-pink-400 transition-colors p-1"
                  aria-label={social.name}
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-pink-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-secondary-light dark:bg-slate-800 shadow-lg absolute w-full left-0 top-16">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={`${item.name}-mobile`}
                to={item.path}
                onClick={closeMobileMenu}
                end={item.path === '/'}
                className={getNavLinkClassName(item.path, item.name)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-4 pb-2 border-t border-pink-200 dark:border-slate-700">
              <div className="flex justify-center space-x-4">
                {SOCIAL_LINKS.map((social: SocialLink) => (
                  <a
                    key={`${social.name}-mobile`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-pink-400 transition-colors p-2"
                    aria-label={social.name}
                    onClick={closeMobileMenu}
                  >
                    <social.Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
