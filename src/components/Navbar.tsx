import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

const links = [
  { label: 'Início', href: '#home' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Galeria', href: '#gallery' },
  { label: 'Redes', href: '#socials' },
  { label: 'Contato', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <a className="brand" href="#home">
        <img src="/logo.jpg" alt="DEAD logo" />
        
      </a>
      <nav>
        {links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#contact">
        Falar com a banda <FiArrowUpRight />
      </a>
    </motion.header>
  );
}
