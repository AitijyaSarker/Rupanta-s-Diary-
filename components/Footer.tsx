import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { SOCIAL_LINKS, CHANNEL_NAME, CONTACT_EMAIL } from '../constants';
import { SocialLink } from '../types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-12 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h5 className="text-xl font-display font-semibold text-primary dark:text-pink-400 mb-3">{CHANNEL_NAME}</h5>
            <p className="text-sm">Sharing lifestyle, study, and authentic UGC. Let's connect and create!</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-primary dark:text-pink-400 mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              {/* Use Link component for internal navigation */}
              <li><Link to="/#about" className="hover:text-primary dark:hover:text-pink-400 transition-colors">About Me</Link></li>
              <li><Link to="/#content" className="hover:text-primary dark:hover:text-pink-400 transition-colors">My Content</Link></li>
              <li><Link to="/#collaborate" className="hover:text-primary dark:hover:text-pink-400 transition-colors">Collaborate</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-primary dark:text-pink-400 mb-3">Connect</h5>
            <div className="flex justify-center md:justify-start space-x-4 mb-3">
              {SOCIAL_LINKS.map((social: SocialLink) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-pink-400 transition-colors"
                  aria-label={social.name}
                >
                  <social.Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm hover:text-primary dark:hover:text-pink-400 transition-colors break-all">{CONTACT_EMAIL}</a>
          </div>
        </div>
        <div className="border-t border-pink-200 dark:border-slate-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {CHANNEL_NAME}. All Rights Reserved.</p>
          <p className="mt-1">Designed with <span className="text-red-500">&hearts;</span> and a touch of pink.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;