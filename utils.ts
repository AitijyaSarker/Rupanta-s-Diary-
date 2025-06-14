export const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;

  let videoId = null;

  try {
    const urlObj = new URL(url);
    
    if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      if (urlObj.pathname === '/watch') {
        videoId = urlObj.searchParams.get('v');
      } else if (urlObj.pathname.startsWith('/embed/')) {
        // Already an embed URL, just ensure autoplay if desired (optional)
        // videoId = urlObj.pathname.substring('/embed/'.length);
        // For simplicity, if it's already an embed URL, return it as is or add autoplay.
        // Adding autoplay by default to embed URLs for consistency.
         const existingVideoId = urlObj.pathname.substring('/embed/'.length).split('?')[0];
         return `https://www.youtube.com/embed/${existingVideoId}?autoplay=1&rel=0`;

      } else if (urlObj.pathname.startsWith('/live/')) {
        videoId = urlObj.pathname.substring('/live/'.length).split('?')[0];
      }
    } else if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.substring(1).split('?')[0]; // Remove leading '/'
    }
  } catch (e) {
    console.error("Invalid URL for YouTube parsing:", url, e);
    // Fallback for non-URL strings or unexpected formats, try regex (less robust)
    const patterns = [
        /youtube\.com\/watch\?v=([^&]+)/,
        /youtu\.be\/([^?]+)/,
        /youtube\.com\/embed\/([^?]+)/,
        /youtube\.com\/live\/([^?]+)/
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            videoId = match[1];
            if (pattern.source.includes('embed')) { // if it was already an embed link
                 return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            }
            break;
        }
    }
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
};
