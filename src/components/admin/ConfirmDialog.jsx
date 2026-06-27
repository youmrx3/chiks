import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import { useEffect } from 'react';

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  onConfirm,
  onCancel,
  variant = 'danger',
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCancel]);

  const iconConfig = {
    danger: { Icon: FiAlertTriangle, bg: 'var(--c-red-pale)', color: 'var(--c-red)' },
    warning: { Icon: FiAlertTriangle, bg: 'var(--c-orange-pale)', color: 'var(--c-orange)' },
    info: { Icon: FiInfo, bg: 'var(--c-blue-pale)', color: 'var(--c-blue)' },
  };

  const { Icon, bg: iconBg, color: iconColor } = iconConfig[variant] || iconConfig.danger;

  const confirmBg = variant === 'danger'
    ? 'var(--c-red)'
    : variant === 'warning'
    ? 'var(--c-orange)'
    : 'var(--c-blue)';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(30,29,27,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '20px',
          }}
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--c-white)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-modal)',
              width: '100%',
              maxWidth: '400px',
              padding: '32px',
              textAlign: 'center',
            }}
          >
            <button
              onClick={onCancel}
              style={{
                position: 'absolute', top: '12px', right: '12px',
                color: 'var(--c-gray-500)', padding: '4px',
                borderRadius: '6px', display: 'flex',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; e.currentTarget.style.color = 'var(--c-gray-900)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
            >
              <FiX size={18} />
            </button>

            <div
              style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: iconBg, color: iconColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '22px',
              }}
            >
              <Icon size={22} />
            </div>

            <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '8px' }}>
              {title}
            </h2>

            <p style={{ fontSize: '13px', color: 'var(--c-gray-500)', lineHeight: 1.6, marginBottom: '24px' }}>
              {message}
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={onCancel}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--c-gray-100)',
                  background: 'transparent',
                  color: 'var(--c-gray-700)',
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                style={{
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-pill)',
                  background: confirmBg,
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
