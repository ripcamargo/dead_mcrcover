import { motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';

export function Contact() {
  return (
    <section className="contact-section" id="contact">
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">Contato</p>
        <h2>Quer levar a Dead para o seu palco?</h2>
        <p>Produtores, booking e fãs podem falar direto pelo WhatsApp para conversar sobre shows, parcerias e eventos especiais.</p>
        <a className="button button-primary" href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
          <FiMessageCircle /> Abrir WhatsApp
        </a>
      </motion.div>
    </section>
  );
}
