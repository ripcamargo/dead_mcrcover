import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

interface GalleryProps {
  images: string[];
}

export function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const visibleImages = useMemo(() => images, [images]);
  const currentImage = visibleImages[activeIndex] ?? visibleImages[0];

  useEffect(() => {
    if (visibleImages.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev === visibleImages.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => window.clearInterval(timer);
  }, [visibleImages.length]);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? visibleImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === visibleImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-heading">
        <p className="eyebrow">Galeria</p>
        
      </div>

      <div className="gallery-showcase">
        <motion.button type="button" className="gallery-nav gallery-nav--prev" onClick={goToPrev} aria-label="Imagem anterior">
          <FiChevronLeft />
        </motion.button>

        <div className="gallery-main-card" onClick={() => setActiveImage(currentImage)}>
          
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={`Foto ${activeIndex + 1}`}
              className="gallery-main-image"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>
        </div>

        <motion.button type="button" className="gallery-nav gallery-nav--next" onClick={goToNext} aria-label="Próxima imagem">
          <FiChevronRight />
        </motion.button>
      </div>

      <div className="gallery-thumbs" aria-label="Miniaturas da galeria">
        {visibleImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={`gallery-thumb ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={image} alt={`Miniatura ${index + 1}`} />
          </button>
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
