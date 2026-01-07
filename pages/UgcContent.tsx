import React, { useMemo, useState } from 'react';
import ContentGrid from '../components/ContentGrid';
import VideoModal from '../components/VideoModal';
import { useContent } from '../context/ContentContext';
import { getYouTubeEmbedUrl } from '../utils';

const UgcContent: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string | undefined>(undefined);
  const { items, loading, error } = useContent();

  const ugcItems = useMemo(
    () => items.filter((item) => item.category === 'UGC'),
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
      <ContentGrid items={ugcItems} categoryName="Collaborations" onWatchVideo={handleWatchVideo} />
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