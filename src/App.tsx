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
  { city: 'São Paulo', venue: 'Audio', date: '21/09/2026', time: '22:00', tickets: 'Ingressos à venda' },
  { city: 'Rio de Janeiro', venue: 'Vivo Rio', date: '03/10/2026', time: '21:30', tickets: 'Últimas unidades' },
  { city: 'Curitiba', venue: 'Music Hall', date: '17/10/2026', time: '22:30', tickets: 'Esgotando' },
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
