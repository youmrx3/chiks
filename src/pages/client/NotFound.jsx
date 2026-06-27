import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '80vh', padding: 32, textAlign: 'center',
    }}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
      >
        <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="42" fill="var(--c-yellow-pale)" stroke="var(--c-yellow)" strokeWidth="2" />
          <circle cx="35" cy="40" r="5" fill="var(--c-gray-900)" />
          <circle cx="65" cy="40" r="5" fill="var(--c-gray-900)" />
          <path d="M35 60C35 60 42 68 50 68C58 68 65 60 65 60" stroke="var(--c-gray-900)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M25 30L30 22" stroke="var(--c-yellow)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M75 30L70 22" stroke="var(--c-yellow)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M30 78L25 85" stroke="var(--c-mint)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M70 78L75 85" stroke="var(--c-mint)" strokeWidth="2.5" strokeLinecap="round" />
          <text x="50" y="18" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--c-yellow-deep)" fontFamily="var(--font-display)">404</text>
        </svg>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'var(--text-2xl)', color: 'var(--c-gray-900)',
          marginTop: 24, marginBottom: 12,
        }}
      >
        Page non trouvée
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        style={{
          fontSize: 'var(--text-base)', color: 'var(--c-gray-500)',
          maxWidth: 400, lineHeight: 1.6, marginBottom: 32,
        }}
      >
        Oups ! La page que vous cherchez n'existe pas ou a été déplacée. Mais ne vous inquiétez pas, notre collection est toujours là.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link
          to="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            height: 52, padding: '0 36px', borderRadius: 'var(--radius-pill)',
            background: 'var(--c-yellow)', color: 'var(--c-gray-900)',
            fontWeight: 700, fontSize: 'var(--text-base)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
        >
          <FiHome size={18} />
          Retourner à l'accueil
        </Link>
      </motion.div>
    </div>
  );
}
