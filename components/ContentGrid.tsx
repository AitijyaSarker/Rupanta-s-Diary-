import React from 'react';
import { ContentItem } from '../types';
import ContentCard from './ContentCard';

interface ContentGridProps {
  items: ContentItem[];
  categoryName: string;
  onWatchVideo: (videoUrl: string, title?: string) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ items, categoryName, onWatchVideo }) => {
  if (!items || items.length === 0) {
    return <p className="text-center text-slate-600 dark:text-slate-400 py-10">No content available in {categoryName} yet. Stay tuned!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {items.map((item) => (
        <ContentCard key={item.id} item={item} onWatchVideo={onWatchVideo} />
      ))}
    </div>
  );
};

export default ContentGrid;