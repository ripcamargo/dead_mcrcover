import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiInstagram, FiMenu, FiX } from 'react-icons/fi';
import { socialUrls } from '../config/socials';
import { FaWhatsapp } from 'react-icons/fa';

const links = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Galeria', href: '#gallery' },
  { label: 'Contato', href: '#contact' },
];

const socialLinks = [
  { label: 'Instagram', href: socialUrls.instagram, icon: <FiInstagram /> },
  { label: 'WhatsApp', href: socialUrls.whatsapp, icon: <FaWhatsapp /> },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };

    onScroll();
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <a className="brand" href="#home" onClick={closeMenu}>
        <img src="/logo dead horizon.png" alt="DEAD logo" />
      </a>

      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className={`nav-panel ${menuOpen ? 'is-open' : ''}`}>
        <nav className="nav-links">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="nav-actions">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            className="nav-social-link"
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            title={social.label}
            onClick={closeMenu}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </motion.header>
  );
}
