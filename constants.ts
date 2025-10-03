
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
  { name: 'Collaborations', path: 'ugc', id: 'ugc' },             
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
    title: 'Collab Example: Manifested Magic with Divoom 💫', 
    description: 'Divoom Ditoo Pro — Retro pixel display, RGB keys, 15W audio, and smart features in one compact speaker.| Divoom x Rupanta’s Diary', 
    imageUrl: 'https://i.postimg.cc/tCTBnwVK/Screenshot-2025-08-08-193307.png', 
    category: 'UGC',
    videoUrl: 'https://www.instagram.com/reel/DMfgxu0Tpir/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },
   { 
    id: 'ugc2', 
    title: 'Collab Example:✨ Desk Glow-Up with Indecor BD ✨', 
    description: 'Use my code RUPANTA10 for 10% OFF your own pegboard! 🫶🏼', 
    imageUrl: 'https://i.postimg.cc/VLQv28wW/Screenshot-2025-10-04-025751.png', 
    category: 'UGC', 
    videoUrl: 'https://www.instagram.com/reel/DPWFbf7E8-u/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' // HAS VIDEO
  },
    { 
    id: 'ugc3', 
    title: 'Collab Example: Dive in caffeine with BongBeanCoffee', 
    description: 'The perfect brew to keep your mind sharp and heart cozy | BongBean x Rupanta’s Diary', 
    imageUrl: 'https://i.postimg.cc/2jWDZLZc/Screenshot-2025-10-04-022232.png', 
    category: 'UGC', 
    videoUrl: 'https://youtube.com/shorts/cSkxOxD7-AQ?si=wJwsjBUYRUJLoyV1'
  },
  { 
    id: 'ugc4', 
    title: 'Collab Example: 👜 The Cutest Chubby Bag is Here! ✨', 
    description: 'Carry your world in the cutest way possible | np_collection_bd x Rupanta’s Diary', 
    imageUrl: 'https://i.postimg.cc/BZCGp9my/Screenshot-2025-10-04-023234.png', 
    category: 'UGC',
    videoUrl: 'https://www.instagram.com/reel/DNirOe4TGQw/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },

  { 
    id: 'ugc5', 
    title: 'Collab Example: ✨ Desk Glow-Up Alert! ✨', 
    description: 'Meet the Divoom Timeframe – pixel art, 400+ clock faces & endless vibes in one frame!', 
    imageUrl: 'https://i.postimg.cc/wBNHHtgL/Screenshot-2025-10-04-020944.png', 
    category: 'UGC', 
    videoUrl: 'https://www.instagram.com/reel/DOoGIZHkzNX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' // HAS VIDEO
  },
  { 
    id: 'ugc6', 
    title: 'Collab Example:✨ Indulge in Self-Care Bliss ✨', 
    description: 'Fresh, sweet, and oh-so-delicious 💕 Meet @aetheria.bd body care essentials – from Cherry Cherry 🍒 to Salted Caramel 🍯 and Lilac Lush 🌸', 
    imageUrl: 'https://i.postimg.cc/441m90VN/Screenshot-2025-10-04-024154.png', 
    category: 'UGC', 
    videoUrl: 'https://www.instagram.com/reel/DNlGNUdTvQG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' // HAS VIDEO
  },
 
 
   { 
    id: 'ugc7', 
    title: 'Collab Example: Gadget Review - Whatook', 
    description: 'Hot Day? Cool Down with Whatook! ❄️☀️', 
    imageUrl: 'https://i.postimg.cc/Y9KyyFXn/511472108-18041239193642271-6947474563786138560-n.jpg', 
    category: 'UGC',
    videoUrl: 'https://www.instagram.com/reel/DLWLBY7TArX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
  },
   { 
    id: 'ugc8', 
    title: 'Collab Example: Website Review - Studypool', 
    description: 'Earn from Your Study Notes! ✨📖', 
    imageUrl: 'https://i.postimg.cc/t40ztbYy/505732139-18039616028642271-7153581206331576445-n-1.jpg', 
    category: 'UGC',
    videoUrl: 'https://www.instagram.com/reel/DKwsbW0z3BV/?utm_source=ig_web_copy_link'
  },
 
 
  { 
    id: 'ugc9', 
    title: 'Collab Example: Skincare Product Demo', 
    description: 'Authentic user-generated content showcasing a new skincare line.', 
    imageUrl: 'https://i.postimg.cc/4y1ZY1b8/Image-231.jpg', 
    category: 'UGC', 
    videoUrl: 'https://www.instagram.com/reel/DKi46QUz7Mp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' // HAS VIDEO
  },

  
 { 
    id: 'ugc10', 
    title: 'Collab Example: Carry Easy', 
    description: 'Lightweight, stylish, always ready,Your perfect everyday companion.', 
    imageUrl: 'https://i.postimg.cc/wB79vJrz/Image-627.jpg', 
    category: 'UGC', 
    videoUrl: 'https://www.instagram.com/reel/DFQUAM5zmBY/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' // HAS VIDEO
  },
  { 
    id: 'ugc11', 
    title: 'Collab Example: Make your Schedule', 
    description: 'Demonstrating the features and benefits of a Schedule Book', 
    imageUrl: 'https://i.postimg.cc/52B56YZX/Image-180.jpg', 
    category: 'UGC', 
    videoUrl: 'https://www.instagram.com/reel/DFDm0RqzLpL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' // HAS VIDEO
  },
];
