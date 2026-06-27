import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiTruck } from 'react-icons/fi';

export default function HeroBanner() {
  return (
    <section style={{
      background: 'var(--c-offwhite)',
      padding: '48px 32px',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center',
      }}
      className="hero-grid"
      >
        <style>{`@media (max-width: 768px) { .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: 'var(--radius-pill)',
            background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)',
            fontSize: 12, fontWeight: 600, marginBottom: 20,
          }}>
            ★ Nouvelle collection Automne-Hiver
          </span>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'var(--text-4xl)', lineHeight: 1.1,
            color: 'var(--c-gray-900)', marginBottom: 20,
          }}>
            Habille ton petit bout<br />avec amour
          </h1>

          <p style={{
            fontSize: 'var(--text-md)', color: 'var(--c-gray-500)',
            lineHeight: 1.7, maxWidth: 440, marginBottom: 32,
          }}>
            Des vêtements pour enfants en coton biologique, conçus en Algérie avec des matériaux doux et durables pour le confort de vos petits.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
            <Link
              to="/boutique"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: 50, padding: '0 36px', borderRadius: 'var(--radius-pill)',
                background: 'var(--c-yellow)', color: 'var(--c-gray-900)',
                fontWeight: 700, fontSize: 'var(--text-base)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
            >
              Découvrir la collection
            </Link>
            <Link
              to="/a-propos"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: 50, padding: '0 36px', borderRadius: 'var(--radius-pill)',
                border: '2px solid var(--c-gray-900)', color: 'var(--c-gray-900)',
                fontWeight: 600, fontSize: 'var(--text-base)',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-900)'; e.currentTarget.style.color = 'var(--c-white)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-900)'; }}
            >
              Notre histoire
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--c-gray-500)' }}>
              <FiTruck size={16} style={{ color: 'var(--c-mint)' }} />
              Livraison offerte dès 5 000 DA
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--c-gray-500)' }}>
              <FiShield size={16} style={{ color: 'var(--c-mint)' }} />
              Paiement sécurisé
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--c-gray-500)' }}>
              <span style={{ color: 'var(--c-mint)', fontWeight: 700 }}>♻</span>
              Coton biologique certifié
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <svg viewBox="0 0 500 500" style={{ width: '100%', maxWidth: 480, height: 'auto' }}>
            <defs>
              <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF5E0" />
                <stop offset="100%" stopColor="#FDF7DC" />
              </linearGradient>
            </defs>
            <path d="M250 60C340 60 440 120 450 220C460 320 380 440 300 460C220 480 120 400 80 320C40 240 160 60 250 60Z" fill="url(#blobGrad)" />
          </svg>

          <img
            src="https://t4.ftcdn.net/jpg/06/29/41/61/360_F_629416158_owvmTg2Kp6GVw7NZQ1swCKkLUaSsVPqW.jpg"
            alt="Collection CHICKS"
            style={{
              position: 'absolute', width: '60%', height: 'auto',
              objectFit: 'contain', transform: 'rotate(-6deg)',
              filter: 'drop-shadow(0 12px 32px rgba(30,29,27,0.2))',
              borderRadius: 'var(--radius-lg)',
            }}
          />

          <div style={{
            position: 'absolute', top: '12%', right: '8%',
            background: 'var(--c-white)', borderRadius: 'var(--radius-md)',
            padding: '12px 16px', boxShadow: 'var(--shadow-card)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 20 }}>🔥</span>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--c-gray-900)' }}>-30%</p>
              <p style={{ fontSize: 9, color: 'var(--c-gray-500)' }}>Sur sélection</p>
            </div>
          </div>

          <div style={{
            position: 'absolute', bottom: '18%', left: '6%',
            background: 'var(--c-white)', borderRadius: 'var(--radius-md)',
            padding: '12px 16px', boxShadow: 'var(--shadow-card)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ color: 'var(--c-yellow)', fontSize: 18 }}>★</span>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--c-gray-900)' }}>4.8/5</p>
              <p style={{ fontSize: 9, color: 'var(--c-gray-500)' }}>1 200+ avis</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
