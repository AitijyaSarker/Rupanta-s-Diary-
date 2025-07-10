import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon, ExternalLinkIcon } from './icons/GenericIcons';

const Rewards: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const rewardsCode = 'RUPANTA13';

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(rewardsCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500); // Reset after 2.5 seconds
    });
  };

  return (
    <section className="py-12 md:py-20 bg-pink-50 dark:bg-slate-800/80 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="relative max-w-3xl mx-auto text-center bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-2xl shadow-xl border-2 border-primary-light dark:border-primary-dark/50 transform hover:scale-105 transition-all duration-500 ease-in-out hover:shadow-[0_0_35px_8px_var(--glow-color)] hover:border-primary dark:hover:border-pink-400">
          <h3 className="font-cursive text-4xl md:text-5xl text-slate-700 dark:text-slate-300 mb-2">
            Your Exclusive YesStyle Discount
          </h3>
          <h2 className="my-4 text-5xl md:text-7xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-primary to-rose-500 dark:from-pink-400 dark:via-primary-light dark:to-rose-400 bg-[length:200%_auto] animate-shine">
            SAVE WITH MY CODE!
          </h2>
          <p className="text-md md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Enjoy a discount on your next YesStyle haul and support my channel! Copy the code, click the button below to shop, and apply it at checkout. Happy shopping!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Copy Code Button Group */}
            <div className="relative">
              <div className="flex items-center space-x-4 border-2 border-dashed border-pink-400 dark:border-pink-500 rounded-lg p-4 bg-secondary-light/50 dark:bg-slate-800/50">
                <span className="text-2xl md:text-3xl font-mono font-bold text-slate-800 dark:text-white tracking-widest">
                  {rewardsCode}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-pink-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-pink-500 transition-all"
                  aria-label="Copy rewards code"
                >
                  {copied ? (
                    <CheckIcon className="w-6 h-6 text-green-500" />
                  ) : (
                    <ClipboardIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
               {copied && (
                <div className="absolute -bottom-10 left-1/2 bg-slate-800 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg animate-fade-in-out">
                    Copied!
                </div>
              )}
            </div>
            
            {/* Go to Website Button */}
            <a
              href="https://www.yesstyle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white dark:bg-pink-500 dark:hover:bg-pink-600 font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
            >
              <ExternalLinkIcon className="w-5 h-5 mr-2" />
              Shop on YesStyle
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
