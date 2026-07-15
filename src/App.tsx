import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Agenda } from './sections/Agenda';
import { Gallery } from './sections/Gallery';
import { Socials } from './sections/Socials';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { FloatingGlow } from './components/FloatingGlow';
import type { ShowItem, SocialLink } from './types';
import { galleryImages } from './data/gallery';

const shows: ShowItem[] = [
  {
    city: 'Sorocaba/SP',
    venue: 'Jubarte Music Pub',
    date: '26/03/2026',
    time: '21h',
    tickets: 'Ensaio Aberto',
  },
  {
    city: 'Sorocaba/SP',
    venue: 'Jubarte Music Pub',
    date: '10/04/2026',
    time: '21h',
    tickets: '',
  },
  {
    city: 'Itapetininga/SP',
    venue: 'Porco e Malte',
    date: '25/04/2026',
    time: '22h',
    tickets: '',
  },
  {
    city: 'Sorocaba/SP',
    venue: 'Rock for Pets',
    date: '09/05/2026',
    time: '19h',
    tickets: '',
  },
  {
    city: 'Itapetininga/SP',
    venue: "Gab's House Bar",
    date: '06/06/2026',
    time: '23h',
    tickets: '',
  },
  {
    city: 'Sorocaba/SP',
    venue: 'Led Bar',
    date: '13/06/2026',
    time: '22h',
    tickets: 'Abertura p/ Aléxia',
  },
  {
    city: 'Sorocaba/SP',
    venue: 'Rock Contra o Câncer',
    date: '14/06/2026',
    time: '20h',
    tickets: "The Devil's Pub",
  },
  {
    city: 'Sorocaba/SP',
    venue: 'Flor de Café',
    date: '25/06/2026',
    time: '21h',
    tickets: 'Acústico • JF Estúdio',
  },

  {
    city: 'Itapetininga/SP',
    venue: "Gab's House Bar",
    date: '08/08/2026',
    time: '22h',
    tickets: '',
  },
  {
    city: 'Sorocaba/SP',
    venue: 'Primatas Hamburgueria',
    date: '30/08/2026',
    time: '20h',
    tickets: "",
  },
  {
    city: 'Itapetininga/SP',
    venue: 'Halloween Party',
    date: '24/10/2026',
    time: '21h',
    tickets: "Gab's House Bar",
  },
];

const socials: SocialLink[] = [
  { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { name: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  { name: 'Spotify', href: 'https://spotify.com', icon: 'spotify' },
  { name: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
  { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
];

// galleryImages imported from src/data/gallery

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        {isLoading ? <LoadingScreen key="loading" /> : null}
      </AnimatePresence>
      {!isLoading ? (
        <>
          <FloatingGlow />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Agenda shows={shows} />
            <Gallery images={galleryImages} />
            <Socials links={socials} />
            <Contact />
          </main>
          <Footer />
        </>
      ) : null}
    </div>
  );
}

export default App;
