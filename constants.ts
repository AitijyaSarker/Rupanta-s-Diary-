
import { SocialLink, NavItem, ContentItem } from './types';
import { YouTubeIcon, InstagramIcon, TikTokIcon, FacebookIcon, MailIcon } from './components/icons/SocialMediaIcons';

export const CREATOR_NAME = "Rupanta Mazumder Kona"; // Updated Name
export const CHANNEL_NAME = "Rupanta's Diary";
export const CONTACT_EMAIL = "rupantasdiary@gmail.com";

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'YouTube', url: 'https://www.youtube.com/@rupantas_diary', Icon: YouTubeIcon },
  { name: 'Instagram', url: 'https://www.instagram.com/rupantas_diary?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', Icon: InstagramIcon },
  { name: 'TikTok', url: 'https://www.tiktok.com/@rupantas_diary', Icon: TikTokIcon },
  { name: 'Facebook', url: 'https://www.facebook.com/share/16c9iEoKRj/?mibextid=wwXIfr', Icon: FacebookIcon },
  { name: 'Email', url: `mailto:${CONTACT_EMAIL}`, Icon: MailIcon },
];

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'My Content', path: '/#content' }, // Stays as hash link for scrolling
  { name: 'Collaborate', path: '/#collaborate' },
];

export const CONTENT_CATEGORIES = [
  { name: 'Lifestyle Vlogs', path: 'lifestyle', id: 'lifestyle' }, 
  { name: 'Study Content', path: 'study', id: 'study' },         
  { name: 'UGC Portfolio', path: 'ugc', id: 'ugc' },             
];

// Note on videoUrl: 
// - Only items with a `videoUrl` string will display a "Watch Now" button and play icon on the image.
// - There are 4 items with videoUrl below: lv1, lv2, sc1, ugc1.
export const SAMPLE_CONTENT_ITEMS: ContentItem[] = [
  // Lifestyle Vlogs (2 items with videoUrl)
  { 
    id: 'lv1', 
    title: 'A Day in My Life: University Edition', 
    description: 'Join me for a typical day as a university student and content creator!', 
    imageUrl: 'https://i.postimg.cc/rFmmVVn5/O5b-Yu-Mn-Avz8-HD-1.jpg', // CORRECTED IMAGE URL
    category: 'Lifestyle', 
    videoUrl: 'https://youtu.be/O5bYuMnAvz8?si=U4jl3dd3cPb5kFr5' // HAS VIDEO
  },
  { 
    id: 'lv2', 
    title: 'My Cozy Organization Hacks', 
    description: 'Get inspired with my desk look and how I keep things tidy and aesthetic.', 
    imageUrl: 'https://i.postimg.cc/NfpHDCVk/Nw9lxtye3hs-HD.jpg', 
    category: 'Lifestyle', 
    videoUrl: 'https://youtu.be/Nw9lxtye3hs?si=doR0XaKg4Yf5jV6F' // HAS VIDEO
  },
  { 
    id: 'lv3', 
    title: 'Festival in my town', 
    description: 'Exploring a decent restaurant and sharing our culture.', 
    imageUrl: 'https://i.postimg.cc/L5R0g3hb/Mz-WLDr-ZB24-A-HD.jpg', 
    category: 'Lifestyle', 
    videoUrl: 'https://youtu.be/MzWLDrZB24A?si=SYRMzmTDjbfb_3V5'
    
  },
  { 
    id: 'lv4', 
    title: 'Last day at hostel🎀', 
    description: 'Aesthetic vlog Bangladeshi🇧🇩📦Organize, movie night🍿Enjoying little things✨', 
    imageUrl: 'https://i.postimg.cc/NfNQ6pmT/m-Bk-Kw6-Ur-N9s-HD.jpg', 
    category: 'Lifestyle', 
    videoUrl: 'https://youtu.be/mBkKw6UrN9s?si=Jg3wIYAHLNnJdUEX'
  },

  // Study Content (1 item with videoUrl)
  { 
    id: 'sc1', 
    title: '📚HSC 2024 Study Tips＋Routine', 
    description: '⏰How to get A+🥇3 Months Full Preparation📝', 
    imageUrl: 'https://i.postimg.cc/XqpQTj1n/CHv-Huh5-UK9-U-HD.jpg', 
    category: 'Study', 
    videoUrl: 'https://youtu.be/CHvHuh5UK9U?si=aPceNY2ichaQq4Dz' // HAS VIDEO
  },
  { 
    id: 'sc2', 
    title: '48 hour STUDY VLOG', 
    description: 'Realistic routine Bangladeshi Exam preparation, coffee, unboxing🎀 Study motivation☕️', 
    imageUrl: 'https://i.postimg.cc/3JxtMRGm/v-Ry-Hk-Nm-X30k-HD.jpg', 
    category: 'Study', 
    videoUrl: 'https://youtu.be/vRyHkNmX30k?si=mOvOAHfbepF3afDk' // HAS VIDEO
  },
  { 
    id: 'sc3', 
    title: 'Late night study vlog🌙📚', 
    description: 'Aesthetic vlog Bangladesh,Pulling an all nighter 🎀Cozy night routine🌟', 
    imageUrl: 'https://i.postimg.cc/LshHyS83/g-Wol5n-DSHSc-HD.jpg', 
    category: 'Study', 
    videoUrl: 'https://youtu.be/gWol5nDSHSc?si=X-1_BgN7jSqRTGLT' // HAS VIDEO
  },
  { 
    id: 'sc4', 
    title: '4 AM morning STUDY VLOG 📚', 
    description: 'Realistic morning routine🎀,Slow mornings,soft music and self-love ☕🪞', 
    imageUrl: 'https://i.postimg.cc/qRf98HhR/svkkf-Y5h4-M8-HD.jpg', 
    category: 'Study', 
    videoUrl: 'https://youtu.be/svkkfY5h4M8?si=6uFdDYyk5xpSodjX' // HAS VIDEO
  },

  // UGC Content (1 item with videoUrl)
  { 
    id: 'ugc1', 
    title: 'UGC Example: Skincare Product Demo', 
    description: 'Authentic user-generated content showcasing a new skincare line.', 
    imageUrl: 'https://i.postimg.cc/4y1ZY1b8/Image-231.jpg', 
    category: 'UGC', 
    videoUrl: 'https://www.instagram.com/reel/DKi46QUz7Mp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' // HAS VIDEO
  },
  { 
    id: 'ugc2', 
    title: 'UGC Example: Fashion Haul & Try-On', 
    description: 'Engaging video featuring a fashion brand\'s latest collection.', 
    imageUrl: 'https://i.postimg.cc/tCSQ8JrV/Image-746.jpg', 
    category: 'UGC', 
    videoUrl: 'https://www.instagram.com/reel/DJwrMAiTzTy/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' // HAS VIDEO
  },
  { 
    id: 'ugc3', 
    title: 'UGC Example: Carry Easy', 
    description: 'Lightweight, stylish, always ready,Your perfect everyday companion.', 
    imageUrl: 'https://i.postimg.cc/wB79vJrz/Image-627.jpg', 
    category: 'UGC', 
    videoUrl: 'https://www.instagram.com/reel/DFQUAM5zmBY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' // HAS VIDEO
  },
  { 
    id: 'ugc4', 
    title: 'UGC Example: Make your Schedule', 
    description: 'Demonstrating the features and benefits of a Schedule Book', 
    imageUrl: 'https://i.postimg.cc/52B56YZX/Image-180.jpg', 
    category: 'UGC', 
    videoUrl: 'https://www.instagram.com/reel/DFDm0RqzLpL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' // HAS VIDEO
  },
];
