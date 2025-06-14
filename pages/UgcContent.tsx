import React, { useState } from 'react';
import ContentGrid from '../components/ContentGrid';
import { SAMPLE_CONTENT_ITEMS } from '../constants';
import VideoModal from '../components/VideoModal';
import { getYouTubeEmbedUrl } from '../utils';

const UgcContent: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string | undefined>(undefined);

  const ugcItems = SAMPLE_CONTENT_ITEMS.filter(item => item.category === 'UGC');

 const handleWatchVideo = (videoPath: string, videoTitle?: string) => {
    const embedUrl = getYouTubeEmbedUrl(videoPath);
    if (embedUrl) {
      setCurrentVideoUrl(embedUrl);
      setCurrentVideoTitle(videoTitle);
      setModalOpen(true);
    } else {
      console.warn("Invalid YouTube URL for modal:", videoPath);
      if (videoPath) window.open(videoPath, '_blank');
    }
  };

  return (
    <>
      <ContentGrid items={ugcItems} categoryName="UGC Portfolio" onWatchVideo={handleWatchVideo} />
      {currentVideoUrl && (
        <VideoModal
          videoUrl={currentVideoUrl}
          title={currentVideoTitle}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setCurrentVideoUrl(null);
          }}
        />
      )}
    </>
  );
};

export default UgcContent;