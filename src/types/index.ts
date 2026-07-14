export interface ShowItem {
  city: string;
  venue: string;
  date: string;
  time: string;
  tickets?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: 'instagram' | 'youtube' | 'spotify' | 'tiktok' | 'facebook';
}

export interface GalleryImage {
  src: string;
  alt: string;
}
