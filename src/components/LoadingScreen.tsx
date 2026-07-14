import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <motion.div
        className="loading-logo"
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img src="/logo.jpg" alt="DEAD logo" />
      </motion.div>
      <motion.div
        className="loading-bar"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
