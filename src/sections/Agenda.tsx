import { motion } from 'framer-motion';
import { useState } from 'react';
import { toPng } from 'html-to-image';
import { FiDownload } from 'react-icons/fi';
import type { ShowItem } from '../types';

interface AgendaProps {
  shows: ShowItem[];
}

export function Agenda({ shows }: AgendaProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportArtwork = async () => {
    const node = document.getElementById('agenda-artwork');
    if (!node) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2, backgroundColor: '#050505' });
      const link = document.createElement('a');
      link.download = 'dead-agenda.png';
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="agenda-section" id="agenda">
      <div className="section-heading">
        <p className="eyebrow">Agenda</p>
        <h2>Próximos shows.</h2>
        <button type="button" className="download-art" onClick={exportArtwork} disabled={isExporting}>
          <FiDownload /> {isExporting ? 'Gerando arte...' : 'Baixar arte'}
        </button>
      </div>
      <div className="shows-grid">
        {shows.map((show, index) => (
          <motion.article
            key={`${show.city}-${show.date}`}
            className="show-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            whileHover={{ y: -8, scale: 1.01, rotateX: 2, rotateY: -2 }}
          >
            <div className="show-topline">
              <span>{show.city}</span>
            
            </div>
            <h3>{show.venue}</h3>
            <p>{show.date}</p>
            <p>{show.time}</p>
            {show.tickets ? <small>{show.tickets}</small> : null}
          </motion.article>
        ))}
      </div>

      <div id="agenda-artwork" className="agenda-artwork" style={{ display: 'none' }}>
        <div className="art-card">
          <img src="/logo.png" alt="DEAD logo" />
          <h3>DEAD</h3>
          <p>Agenda 2026</p>
          <ul>
            {shows.map((show) => (
              <li key={`${show.city}-${show.date}`}>
                {show.city} — {show.venue} — {show.date} • {show.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
