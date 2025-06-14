import React, { useState } from 'react';
import ContentGrid from '../components/ContentGrid';
import { SAMPLE_CONTENT_ITEMS } from '../constants';
import VideoModal from '../components/VideoModal';
import { getYouTubeEmbedUrl } from '../utils';

const LifestyleVlogs: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string | undefined>(undefined);

  const lifestyleItems = SAMPLE_CONTENT_ITEMS.filter(item => item.category === 'Lifestyle');

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

  return (
    <>
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