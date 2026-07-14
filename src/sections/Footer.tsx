import { motion } from 'framer-motion';

export function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="footer-brand">
        <img src="/logo.jpg" alt="DEAD logo" />
        <span>DEAD</span>
      </div>
      <p>Every night feels like the last one.</p>
      <small>© 2026 DEAD! - My Chemical Romance cover. Todos os direitos reservados.</small>
    </motion.footer>
  );
}
