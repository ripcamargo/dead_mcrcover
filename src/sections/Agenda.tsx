import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { toPng } from 'html-to-image';
import { FiDownload, FiX } from 'react-icons/fi';
import type { ShowItem } from '../types';

interface AgendaProps {
  shows: ShowItem[];
}

const MONTHS_PT = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

function splitDate(date: string) {
  const [day, month] = date.split('/');
  const monthLabel = MONTHS_PT[Number(month) - 1] ?? month;
  return { day, monthLabel };
}

function parseBRDate(date: string) {
  const [day, month, year] = date.split('/').map(Number);
  return new Date(year, month - 1, day);
}

export function Agenda({ shows }: AgendaProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Ordena os shows por data (mais antigo → mais recente)
  const sortedShows = useMemo(() => {
    return [...shows].sort(
      (a, b) => parseBRDate(a.date).getTime() - parseBRDate(b.date).getTime()
    );
  }, [shows]);

  const upcomingShows = sortedShows.filter(
    (show) => parseBRDate(show.date) >= today
  );

  const pastShows = sortedShows.filter(
    (show) => parseBRDate(show.date) < today
  );

  // Gera a arte e abre o modal de preview
  const openPreview = async () => {
    const node = document.getElementById('agenda-artwork');
    if (!node) return;

    setIsGenerating(true);

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#050505',
      });

      setPreviewUrl(dataUrl);
    } catch (err) {
      console.error('Erro ao gerar arte:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const closePreview = () => setPreviewUrl(null);

  // Baixa a arte que já está sendo exibida no modal
  const downloadPreview = async () => {
    if (!previewUrl) return;

    setIsDownloading(true);

    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        try {
          const blob = await (await fetch(previewUrl)).blob();
          const file = new File([blob], 'dead-agenda.png', { type: 'image/png' });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: 'Agenda',
            });
            return;
          }
        } catch (shareErr) {
          if ((shareErr as Error).name === 'AbortError') return;
          console.warn('Falha ao compartilhar, usando fallback:', shareErr);
        }

        window.open(previewUrl, '_blank');
        return;
      }

      const link = document.createElement('a');
      link.download = 'dead-agenda.png';
      link.href = previewUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Erro ao baixar arte:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="agenda-section" id="agenda">
      <div className="section-heading">
        <p className="eyebrow">Agenda</p>

        <div className="section-heading__actions">
          {pastShows.length > 0 ? (
            <button
              type="button"
              className="toggle-past"
              onClick={() => setShowPast((prev) => !prev)}
            >
              {showPast
                ? 'Ocultar shows passados'
                : `Exibir shows passados (${pastShows.length})`}
            </button>
          ) : null}

          <button
            type="button"
            className="download-art"
            onClick={openPreview}
            disabled={isGenerating}
          >
            <FiDownload /> {isGenerating ? 'Gerando arte...' : ''}
          </button>
        </div>
      </div>

      {upcomingShows.length > 0 ? (
        <div className="shows-grid">
          {upcomingShows.map((show, index) => (
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
      ) : (
        <p className="agenda-empty">
          Nenhum show agendado no momento. Fique de olho nas redes para novidades.
        </p>
      )}

      {showPast && pastShows.length > 0 ? (
        <>
          <div className="agenda-divider" aria-hidden="true" />

          <div className="shows-grid shows-grid--past">
            {pastShows.map((show, index) => (
              <motion.article
                key={`${show.city}-${show.date}`}
                className="show-card show-card--past"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
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
        </>
      ) : null}

      {/* Card usado apenas para gerar a imagem (fica escondido via CSS) */}
      <div className="agenda-artwork-clip">
        <div id="agenda-artwork" className="art-card">
          <div className="art-card__background" aria-hidden="true" />

          <div className="art-card__content">
            <div className="art-card__timeline">
              {upcomingShows.map((show) => {
                const { day, monthLabel } = splitDate(show.date);

                return (
                  <div
                    className="art-card__row"
                    key={`${show.city}-${show.date}`}
                  >
                    <div className="art-card__date-block">
                      <span className="art-card__day">{day}</span>
                      <span className="art-card__month">{monthLabel}</span>
                    </div>

                    <div className="art-card__info">
                      <span className="art-card__venue">{show.venue}</span>

                      <span className="art-card__city">
                        {show.city} • {show.time}
                      </span>

                      {show.tickets ? (
                        <span className="art-card__tickets">
                          {show.tickets}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de preview */}
      <AnimatePresence>
        {previewUrl ? (
          <motion.div
            className="artwork-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
          >
            <motion.div
              className="artwork-modal"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="artwork-modal__close"
                onClick={closePreview}
                aria-label="Fechar"
              >
                <FiX />
              </button>

              <img
                src={previewUrl}
                alt="Arte da agenda"
                className="artwork-modal__image"
              />

              <div className="artwork-modal__actions">
                <button
                  type="button"
                  className="artwork-modal__download"
                  onClick={downloadPreview}
                  disabled={isDownloading}
                >
                  <FiDownload /> {isDownloading ? 'Baixando...' : 'Baixar arte'}
                </button>

                <button
                  type="button"
                  className="artwork-modal__cancel"
                  onClick={closePreview}
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}