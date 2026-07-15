import { motion } from 'framer-motion';
import { useState } from 'react';
import { toPng } from 'html-to-image';
import { FiDownload } from 'react-icons/fi';
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
  const [isExporting, setIsExporting] = useState(false);
  const [showPast, setShowPast] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingShows = shows.filter((show) => parseBRDate(show.date) >= today);
  const pastShows = shows.filter((show) => parseBRDate(show.date) < today);

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
        <div className="section-heading__actions">
          {pastShows.length > 0 ? (
            <button type="button" className="toggle-past" onClick={() => setShowPast((prev) => !prev)}>
              {showPast ? 'Ocultar datas passadas' : `Datas passadas (${pastShows.length})`}
            </button>
          ) : null}
          <button type="button" className="download-art" onClick={exportArtwork} disabled={isExporting}>
            <FiDownload /> {isExporting ? 'Gerando arte...' : ''}
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
        <p className="agenda-empty">Nenhum show agendado no momento. Fique de olho nas redes para novidades.</p>
      )}

      {showPast && pastShows.length > 0 ? (
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
      ) : null}

      <div className="agenda-artwork-clip">
        <div id="agenda-artwork" className="art-card">
          <div className="art-card__photo">
            <span className="art-card__stripe art-card__stripe--1" />
            <span className="art-card__stripe art-card__stripe--2" />
            <span className="art-card__stripe art-card__stripe--3" />
          </div>

          <div className="art-card__header">
            <p className="art-card__eyebrow">DEAD · My Chemical Romance Cover</p>
            <h3 className="art-card__title">
              AGE<br />NDA
            </h3>
            <p className="art-card__subtitle">Próximos shows 2026</p>
          </div>

          <div className="art-card__list">
            {upcomingShows.map((show) => {
              const { day, monthLabel } = splitDate(show.date);
              return (
                <div className="art-card__row" key={`${show.city}-${show.date}`}>
                  <span className="art-card__date">
                    {day}.{monthLabel}
                  </span>
                  <span className="art-card__info">
                    <span className="art-card__venue">{show.venue}</span>
                    <span className="art-card__city">
                      {show.city} • {show.time}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="art-card__footer">
            <img src="/logo dead horizon.png" alt="DEAD logo" />
          </div>
        </div>
      </div>
    </section>
  );
}
