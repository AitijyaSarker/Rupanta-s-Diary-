import React, { useEffect } from 'react';
import { CloseIcon } from './icons/GenericIcons';

interface VideoModalProps {
  videoUrl: string | null;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, title, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling background
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 transition-opacity duration-300"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby="videoModalTitle"
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-2xl overflow-hidden w-full max-w-3xl aspect-video relative flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <div className="flex justify-between items-center p-3 bg-slate-700">
            <h3 id="videoModalTitle" className="text-pink-300 font-semibold text-sm truncate">
                {title || 'Video Playback'}
            </h3>
            <button
                onClick={onClose}
                className="text-slate-300 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-600"
                aria-label="Close video player"
            >
                <CloseIcon className="w-5 h-5" />
            </button>
        </div>
        <div className="w-full h-full flex-grow">
          <iframe
            src={videoUrl}
            title={title || 'YouTube video player'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;