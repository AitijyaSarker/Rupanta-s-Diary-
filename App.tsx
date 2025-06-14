
import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import AboutMe from './components/AboutMe';
import MyContent from './components/MyContent';
import CollaborationForm from './components/CollaborationForm';
import Footer from './components/Footer';
import LifestyleVlogs from './pages/LifestyleVlogs';
import StudyContent from './pages/StudyContent';
import UgcContent from './pages/UgcContent';
import { Theme } from './types';
import { CONTENT_CATEGORIES } from './constants'; 

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const App: React.FC = () => {
 const [theme, setTheme] = useState<Theme>(() => {
  const localTheme = localStorage.getItem('theme') as Theme | null;
  return localTheme || Theme.LIGHT; // force light mode as default
});


  const location = useLocation(); 

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Effect for scrolling based on URL hash
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.startsWith('#/') ? location.hash.substring(2) : location.hash.substring(1);
      if (id) { // Ensure id is not empty
        const element = document.getElementById(id);
        if (element) {
          requestAnimationFrame(() => { // Use requestAnimationFrame for smoother scroll timing
            element.scrollIntoView({ behavior: 'smooth' });
          });
        } else {
          console.warn(`[App.tsx] Hash Scroll: Element with ID '${id}' not found (from hash '${location.hash}').`);
        }
      }
    }
  }, [location.hash]); 

  // Effect for scrolling based on pathname changes
  useEffect(() => {
    if (location.hash) return;

    const isContentSubpage = CONTENT_CATEGORIES.some(cat => location.pathname === `/${cat.path}`);
    
    if (location.pathname === '/' && !location.hash) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    } else if (isContentSubpage) {
      const contentSection = document.getElementById('content');
      if (contentSection) {
        setTimeout(() => {
          contentSection.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      } else {
        console.warn(`[App.tsx] Path Scroll: Element with ID 'content' not found for content subpage.`);
      }
    }
  }, [location.pathname, location.hash]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const HomePageLayout: React.FC = () => (
    <>
      <Banner />
      <div id="about" className="py-8 md:py-16 scroll-mt-20"><AboutMe /></div>
      <div id="content" className="py-8 md:py-16 scroll-mt-50"><MyContent /></div>
      <div id="collaborate" className="py-8 md:py-16 scroll-mt-20"><CollaborationForm /></div>
    </>
  );
  
  const NotFoundPage: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-8rem)]">
      <h1 className="text-6xl font-display text-primary dark:text-pink-400 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg mb-8 text-slate-600 dark:text-slate-400">Sorry, the page you are looking for does not exist.</p>
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
        <main className="flex-grow pt-16"> {/* Navbar height h-16 */}
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
