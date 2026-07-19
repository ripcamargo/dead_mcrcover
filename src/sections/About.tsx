import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="about-section" id="about" ref={ref}>
      <motion.div
        className="about-copy"
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">Sobre a banda</p>
        <h2>Uma homenagem com alma, sangue e espetáculo.</h2>
        <p style={{ textAlign: 'justify' }}>
          Formada em Sorocaba/SP, a <b>DEAD!</b> nasceu da paixão em comum de cinco músicos pelo universo do <b>My Chemical Romance</b>. Mais do que interpretar suas músicas, a proposta da banda é recriar a intensidade, a emoção e a identidade que transformaram o MCR em uma das maiores referências do rock alternativo dos anos 2000. Cada apresentação é pensada para entregar uma experiência imersiva, unindo performance, sonoridade e estética em um tributo à altura de seu legado.
</p>
      </motion.div>
      <motion.div
        className="about-visual"
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
        transition={{ duration: 0.9, delay: 0.1 }}
      >
        <img src="/background2.jpg" alt="Banda ao vivo" />
      </motion.div>
    </section>
  );
}
