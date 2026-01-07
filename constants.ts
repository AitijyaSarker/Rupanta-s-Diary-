
import { SocialLink, NavItem } from './types';
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
