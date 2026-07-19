import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

export function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay" />
      <div className="hero-content">
        
        <motion.img
          src="/logo dead vert.png"
          alt="DEAD logo"
          className="hero-logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Uma experiência de palco com a intensidade do emo clássico, a elegância do rock moderno e a energia de um espetáculo que transforma cada noite em uma pulseira de luz e fumaça.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <a className="button button-primary" href="#agenda">
            Ver agenda
          </a>
          <a className="button button-secondary" href="#contact">
            Contato
          </a>
        </motion.div>
      </div>
      <motion.a
        className="scroll-indicator"
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        
        <FiArrowDown />
      </motion.a>
    </section>
  );
}
