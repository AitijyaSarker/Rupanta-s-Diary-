import React from 'react';
import { ContentItem } from '../types';
import { PlayCircleIcon } from './icons/GenericIcons';

interface ContentCardProps {
  item: ContentItem;
  onWatchVideo: (videoUrl: string, title?: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onWatchVideo }) => {
  const handleVideoPlay = () => {
    if (item.videoUrl) {
      onWatchVideo(item.videoUrl, item.title);
    }
    // If no item.videoUrl, clicking the button does nothing, which is fine.
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 group border-2 border-transparent hover:border-primary dark:hover:border-pink-500 flex flex-col h-full">
      <div className="relative">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 ${item.videoUrl ? 'cursor-pointer' : ''}`}
          onClick={handleVideoPlay} // Allow click on image to trigger video if URL exists
        />
        {/* Play icon overlay - always visible */}
        <button
          onClick={handleVideoPlay}
          className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          aria-label={`Watch ${item.title}`}
        >
          <PlayCircleIcon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" />
        </button>
       <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full dark:bg-pink-500">
  {item.category === 'UGC' ? 'Collab' : item.category}
</span>

      </div>
      <div className="p-5 flex-grow"> {/* Added flex-grow here */}
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-pink-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
          {item.description}
        </p>
      </div>
      {/* "Watch Now" button - always visible */}
       <div className="p-5 pt-0 mt-auto"> {/* Added mt-auto to ensure it's at the bottom of the flex column when content is short, flex-grow above handles when content is long */}
          <button
              onClick={handleVideoPlay}
              className="inline-block w-full text-center px-4 py-2 bg-primary-light dark:bg-pink-600 text-primary-dark dark:text-white rounded-md hover:bg-primary dark:hover:bg-pink-500 transition-colors duration-200 font-medium text-sm"
          >
              Watch Now
          </button>
       </div>
    </div>
  );
};

export default ContentCard;