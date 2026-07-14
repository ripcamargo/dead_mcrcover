import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function FloatingGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <motion.div
      className="floating-glow"
      animate={{ x: position.x - 200, y: position.y - 200, opacity: [0.25, 0.5, 0.25] }}
      transition={{ type: 'spring', stiffness: 40, damping: 30, mass: 0.6 }}
    />
  );
}
