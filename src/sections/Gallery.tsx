import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface GalleryProps {
  images: string[];
}

export function Gallery({ images }: GalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-heading">
        <p className="eyebrow">Galeria</p>
        <h2>Imagens que respiram palco.</h2>
      </div>
      <div className="masonry-grid">
        {images.map((image, index) => (
          <motion.button
            key={`${image}-${index}`}
            type="button"
            className={`gallery-item item-${index % 3}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
            onClick={() => setActiveImage(image)}
          >
            <img src={image} alt={`Foto ${index + 1}`} />
          </motion.button>
        ))}
      </div>

      {activeImage ? (
        <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveImage(null)}>
          <button type="button" className="lightbox-close" onClick={() => setActiveImage(null)}>
            <FiX />
          </button>
          <img src={activeImage} alt="Visualização em destaque" />
        </motion.div>
      ) : null}
    </section>
  );
}
