// App.tsx
import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import AboutMe from './components/AboutMe';
import MyContent from './components/MyContent';
import CollaborationForm from './components/CollaborationForm';
import Footer from './components/Footer';
import LifestyleVlogs from './pages/LifestyleVlogs';
import StudyContent from './pages/StudyContent';
import UgcContent from './pages/UgcContent';
import { CONTENT_CATEGORIES } from './constants';
import MarqueeBanner from './components/MarqueeBanner';
import Rewards from './components/Rewards';
import { Theme } from './types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType | null>(null);

const App: React.FC = () => {
  const location = useLocation();

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        return Theme.DARK;
      }
    }
    return Theme.LIGHT;
  });

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  // Scroll handler for hash + tab changes
  useEffect(() => {
    const hash = location.hash;
    const path = location.pathname;
    let targetId: string | null = null;

    if (hash.startsWith('#/')) {
      targetId = 'content';
    } else if (hash.startsWith('#')) {
      targetId = hash.slice(1);
    }

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
      return;
    }

    if (path === '/' && (hash === '' || hash === '#')) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  }, [location]);

  const HomePageLayout: React.FC = () => (
    <>
      <Banner />

      {/* Only scroll-margin, no extra padding here */}
      <div id="about" className="scroll-mt-24">
        <AboutMe />
      </div>

      <div id="content" className="scroll-mt-24">
        <MyContent />
      </div>

      <div id="rewards" className="scroll-mt-24">
        <Rewards />
      </div>

      <div id="collaborate" className="scroll-mt-24">
        <CollaborationForm />
      </div>
    </>
  );

  const NotFoundPage: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-8rem)]">
      <h1 className="text-6xl font-display text-primary dark:text-pink-400 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg mb-8 text-slate-600 dark:text-slate-400">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary hover:bg-primary-dark text-white dark:bg-pink-500 dark:hover:bg-pink-600 font-semibold rounded-lg shadow-md transition-colors duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="flex flex-col min-h-screen bg-secondary-light dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <Navbar />
        <MarqueeBanner />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<HomePageLayout />}>
              <Route index element={<LifestyleVlogs />} />
              <Route path={CONTENT_CATEGORIES[0].path} element={<LifestyleVlogs />} />
              <Route path={CONTENT_CATEGORIES[1].path} element={<StudyContent />} />
              <Route path={CONTENT_CATEGORIES[2].path} element={<UgcContent />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
