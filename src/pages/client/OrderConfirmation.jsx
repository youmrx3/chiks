import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiPackage, FiClock, FiMail } from 'react-icons/fi';

const CONFETTI_COLORS = ['#F5C842', '#8DD5D0', '#E53935', '#2E7D32', '#1565C0', '#E65100', '#C3B1E1', '#E8B4B8'];

export default function OrderConfirmation() {
  const { id } = useParams();

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '80px 32px', textAlign: 'center', position: 'relative', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 - 50 + 'vw',
              y: -20,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: '110vh',
              rotate: 720 + Math.random() * 360,
              opacity: 0,
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              width: 8 + Math.random() * 10,
              height: 6 + Math.random() * 14,
              background: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--c-green)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 32px rgba(46,125,50,0.3)',
          }}
        >
          <FiCheck size={40} color="#fff" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'var(--text-xl)', color: 'var(--c-gray-900)',
            marginBottom: 8,
          }}
        >
          Commande confirmée ! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-500)', marginBottom: 32 }}
        >
          Merci pour votre commande. Nous vous enverrons une confirmation par email.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          style={{
            background: 'var(--c-white)', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-card)', padding: 28, textAlign: 'left',
            marginBottom: 32,
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--c-gray-900)', marginBottom: 20, textAlign: 'center' }}>
            Détails de la commande
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <FiPackage size={20} style={{ color: 'var(--c-yellow-deep)', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>Numéro de commande</p>
                <p style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-gray-900)' }}>{id}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <FiCheck size={20} style={{ color: 'var(--c-green)', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>Statut</p>
                <span style={{
                  display: 'inline-block', padding: '4px 12px', borderRadius: 'var(--radius-pill)',
                  background: 'var(--c-green-pale)', color: 'var(--c-green-deep)',
                  fontSize: 11, fontWeight: 700,
                }}>
                  Confirmée
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <FiClock size={20} style={{ color: 'var(--c-orange)', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>Livraison estimée</p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}>3 à 5 jours ouvrés</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <FiMail size={20} style={{ color: 'var(--c-blue)', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>Email de confirmation</p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}>Envoyé à votre adresse email</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <Link
            to="/mes-commandes"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: 50, borderRadius: 'var(--radius-pill)',
              background: 'var(--c-gray-900)', color: '#fff',
              fontWeight: 700, fontSize: 'var(--text-base)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Suivre ma commande
          </Link>
          <Link
            to="/boutique"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: 48, borderRadius: 'var(--radius-pill)',
              color: 'var(--c-gray-700)', fontWeight: 600, fontSize: 'var(--text-base)',
              transition: 'color 0.2s',
            }}
          >
            Continuer les achats
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
