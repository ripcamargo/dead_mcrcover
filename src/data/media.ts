import type { MediaItem } from '../types';

export const mediaItems: MediaItem[] = [
  {
    id: 'logo-main',
    category: 'logo',
    title: 'Logotipos',
    description: 'Logos em alta resolução para criação de materiais promocionais',
    externalLink: 'https://drive.google.com/drive/folders/1EOKLsy6pVCQDrhLnybyFvd8rHD4YRJZN?usp=sharing',
  },
  {
    id: 'rider-technical',
    category: 'rider',
    title: 'Rider Técnico',
    description: 'Especificações técnicas para apresentações',
  },
  {
    id: 'banner-event',
    category: 'banner',
    title: 'Banner para Eventos',
    description: 'Arte pronta para divulgação',
  },
  {
    id: 'poster-1',
    category: 'poster',
    title: 'Pôster - Black Parade Tour',
    description: 'Pôster da turnê Black Parade 1st Tour',
  },
];

export const mediaCategories = [
  { id: 'logo', name: 'Logotipos', icon: '' },
  { id: 'rider', name: 'Rider Técnico', icon: '' },
  { id: 'banner', name: 'Banners', icon: '' },
  { id: 'poster', name: 'Pôsteres', icon: '' },
  { id: 'outro', name: 'Outros', icon: '' },
];
