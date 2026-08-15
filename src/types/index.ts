export interface ShowItem {
  city: string;
  venue: string;
  date: string;
  time: string;
  tickets?: string;
  tour: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: 'instagram' | 'youtube' | 'spotify' | 'tiktok' | 'facebook' | 'whatsapp';
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface MediaItem {
  id: string;
  category: 'logo' | 'rider' | 'banner' | 'poster' | 'outro';
  title: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
  externalLink?: string;
}

export interface MediaCategory {
  id: string;
  name: string;
  icon: string;
}
