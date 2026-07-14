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
        <p>
          O DEAD nasceu do desejo de levar a essência do emo e do post-hardcore para os palcos com precisão, emoção e estética refinada. Cada apresentação é construída para fazer o público sentir o peso de cada verso e a intensidade de cada refrão.
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
