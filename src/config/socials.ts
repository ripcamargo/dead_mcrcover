export const socialUrls = {
  instagram: 'https://instagram.com/mcrcoveroficial',
  whatsapp: 'https://wa.me/5515992804994',
  youtube: 'https://youtube.com',
} as const;

export const socialLinks = [
  { name: 'Instagram', href: socialUrls.instagram, icon: 'instagram' as const },
  { name: 'YouTube', href: socialUrls.youtube, icon: 'youtube' as const },
  { name: 'WhatsApp', href: socialUrls.whatsapp, icon: 'whatsapp' as const },
];
