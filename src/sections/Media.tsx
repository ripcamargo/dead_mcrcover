import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import type { MediaItem } from '../types';
import { mediaItems, mediaCategories } from '../data/media';

interface MediaProps {
  items?: MediaItem[];
}

export function Media({ items = mediaItems }: MediaProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  const handleDownload = (item: MediaItem) => {
    if (!item.fileUrl) return;
    const link = document.createElement('a');
    link.href = item.fileUrl;
    link.download = item.fileName || '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="media-section" id="media">
      <div className="section-heading">
        <p className="eyebrow">Mídia</p>
        <h2>Conteúdo para Contratantes</h2>
        <p className="section-subtitle">Logotipos, rider técnico, banners e outros arquivos para divulgação</p>
      </div>

      <div className="media-filters">
        <button
          type="button"
          className={`filter-button ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          Todos
        </button>
        {mediaCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="media-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="media-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="media-card__content">
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
              {item.externalLink ? (
                <a
                  href={item.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="media-card__link"
                  title={`Acessar ${item.title}`}
                >
                  <FiExternalLink />
                  <span>Acessar</span>
                </a>
              ) : item.fileUrl ? (
                <button
                  type="button"
                  className="media-card__download"
                  onClick={() => handleDownload(item)}
                  title={`Baixar ${item.fileName}`}
                >
                  <FiDownload />
                  <span>Baixar</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="media-card__download media-card__download--disabled"
                  disabled
                  title="Em construção"
                >
                  <span>Em construção...</span>
                </button>
              )}
            </motion.div>
          ))
        ) : (
          <p className="media-empty">Nenhum arquivo encontrado nesta categoria.</p>
        )}
      </div>
    </section>
  );
}
