
import React from 'react'; // Added import

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface SocialLink {
  name: string;
  url: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface NavItem {
  name: string;
  path: string; // Can be a hash link like #about or a route like /content
}

export type ContentCategory = 'Lifestyle' | 'Study' | 'UGC';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string; // Optional link to the actual content
  category: ContentCategory;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContentInput {
  title: string;
  description: string;
  category: ContentCategory;
  videoUrl?: string;
  imageUrl?: string;
  thumbnailFile?: File | null;
}

export interface User {
  name: string;
  email: string;
}

export interface CollaborationFormData {
  name: string;
  email: string;
  message: string;
  projectType?: string;
}