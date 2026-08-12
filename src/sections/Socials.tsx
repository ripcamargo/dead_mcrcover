import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import type { SocialLink } from '../types';

interface SocialsProps {
  links: SocialLink[];
}

const iconMap = {
  instagram: FaInstagram,
  youtube: FaYoutube,
  spotify: FaSpotify,
  tiktok: FaTiktok,
  facebook: FaFacebookF,
  whatsapp: FiMessageCircle,
};

export function Socials({ links }: SocialsProps) {
  return (
    <section className="socials-section" id="socials">
      <div className="section-heading">
        <p className="eyebrow">Redes</p>
        <h2>Follow the ritual.</h2>
      </div>
      <div className="social-grid">
        {links.map((link, index) => {
          const Icon = iconMap[link.icon];
          return (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="social-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: '0 18px 50px rgba(208, 17, 33, 0.25)' }}
            >
              <Icon />
              <span>{link.name}</span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
