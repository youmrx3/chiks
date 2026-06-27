import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Retour en haut"
          style={{
            position: 'fixed', bottom: 96, right: 24, zIndex: 900,
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--c-yellow)', color: 'var(--c-gray-900)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-card)',
            transition: 'background 0.2s, transform 0.2s',
            cursor: 'pointer', border: 'none',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
        >
          <FiArrowUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
