import React, { useMemo, useState } from 'react';
import ContentGrid from '../components/ContentGrid';
import VideoModal from '../components/VideoModal';
import { useContent } from '../context/ContentContext';
import { getYouTubeEmbedUrl } from '../utils';

const LifestyleVlogs: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string | undefined>(undefined);
  const { items, loading, error } = useContent();

  const lifestyleItems = useMemo(
    () => items.filter((item) => item.category === 'Lifestyle'),
    [items]
  );

  const handleWatchVideo = (videoPath: string, videoTitle?: string) => {
    const embedUrl = getYouTubeEmbedUrl(videoPath);
    if (embedUrl) {
      setCurrentVideoUrl(embedUrl);
      setCurrentVideoTitle(videoTitle);
      setModalOpen(true);
    } else {
      console.warn("Invalid YouTube URL for modal:", videoPath);
      // Fallback: open in new tab if URL is not processable but exists
      if (videoPath) window.open(videoPath, '_blank');
    }
  };

  if (loading) {
    return <p className="text-center text-slate-600 dark:text-slate-400">Loading content...</p>;
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-3 border border-red-200">
          {error}
        </div>
      )}
      <ContentGrid items={lifestyleItems} categoryName="Lifestyle Vlogs" onWatchVideo={handleWatchVideo} />
      {currentVideoUrl && (
        <VideoModal
          videoUrl={currentVideoUrl}
          title={currentVideoTitle}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setCurrentVideoUrl(null); // Stop video by removing src
          }}
        />
      )}
    </>
  );
};

export default LifestyleVlogs;