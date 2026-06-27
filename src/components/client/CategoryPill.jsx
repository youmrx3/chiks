import { motion } from 'framer-motion';

export default function CategoryPill({ name, icon, count, active, onClick }) {
  const Icon = icon;

  return (
    <motion.button
      whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        width: 160, padding: '20px 12px', borderRadius: 'var(--radius-lg)',
        background: active ? 'var(--c-yellow-pale)' : 'var(--c-white)',
        border: `1px solid ${active ? 'var(--c-yellow)' : 'var(--c-gray-100)'}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s',
        textAlign: 'center',
      }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'var(--c-yellow-pale)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {typeof icon === 'string' && icon.startsWith('http') ? (
          <img src={icon} alt="" style={{ width: 32, height: 32, objectFit: 'contain' }} />
        ) : typeof icon === 'string' ? (
          <span style={{ fontSize: 28 }}>{icon}</span>
        ) : Icon ? (
          <Icon size={28} style={{ color: 'var(--c-yellow-deep)' }} />
        ) : null}
      </div>
      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}>{name}</span>
      <span style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>{count} produits</span>
    </motion.button>
  );
}
