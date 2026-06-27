import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const SIZE_DATA = [
  { size: 'Naissance', age: '0-1 mois', poids: '3-4', taille: '50-54', poitrine: '36-38' },
  { size: '1 mois', age: '1-2 mois', poids: '4-5', taille: '54-57', poitrine: '38-40' },
  { size: '3 mois', age: '2-4 mois', poids: '5-7', taille: '57-62', poitrine: '40-42' },
  { size: '6 mois', age: '4-8 mois', poids: '7-8', taille: '62-68', poitrine: '42-44' },
  { size: '9 mois', age: '8-10 mois', poids: '8-9', taille: '68-74', poitrine: '44-46' },
  { size: '12 mois', age: '10-14 mois', poids: '9-10', taille: '74-80', poitrine: '46-48' },
  { size: '18 mois', age: '14-20 mois', poids: '10-11', taille: '80-86', poitrine: '48-50' },
  { size: '2 ans', age: '20-28 mois', poids: '11-13', taille: '86-92', poitrine: '50-52' },
  { size: '3 ans', age: '2-3 ans', poids: '13-15', taille: '92-98', poitrine: '52-54' },
  { size: '4 ans', age: '3-4 ans', poids: '15-17', taille: '98-104', poitrine: '54-56' },
  { size: '5 ans', age: '4-5 ans', poids: '17-19', taille: '104-110', poitrine: '56-58' },
  { size: '6 ans', age: '5-6 ans', poids: '19-21', taille: '110-116', poitrine: '58-61' },
  { size: '7 ans', age: '6-7 ans', poids: '21-24', taille: '116-122', poitrine: '61-64' },
  { size: '8 ans', age: '7-8 ans', poids: '24-27', taille: '122-128', poitrine: '64-67' },
];

export default function SizeGuideModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 3000,
              background: 'rgba(30,29,27,0.5)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--c-white)', borderRadius: 'var(--radius-xl)',
                width: '100%', maxWidth: 600, maxHeight: '90vh',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                boxShadow: 'var(--shadow-modal)',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '24px 28px', borderBottom: '1px solid var(--c-gray-100)',
              }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)' }}>
                  Guide des tailles
                </h2>
                <button onClick={onClose} style={{ padding: 8, borderRadius: '50%', color: 'var(--c-gray-500)', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-gray-50)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <FiX size={20} />
                </button>
              </div>

              <div style={{ overflowX: 'auto', padding: '24px 28px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
                  <thead>
                    <tr style={{ background: 'var(--c-yellow-pale)' }}>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--c-gray-900)', borderBottom: '1px solid var(--c-gray-100)' }}>Taille</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--c-gray-900)', borderBottom: '1px solid var(--c-gray-100)' }}>Âge</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--c-gray-900)', borderBottom: '1px solid var(--c-gray-100)' }}>Poids (kg)</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--c-gray-900)', borderBottom: '1px solid var(--c-gray-100)' }}>Taille (cm)</th>
                      <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--c-gray-900)', borderBottom: '1px solid var(--c-gray-100)' }}>Poitrine (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_DATA.map((row, i) => (
                      <tr key={row.size} style={{ borderBottom: '1px solid var(--c-gray-50)' }}>
                        <td style={{ padding: '8px 14px', fontWeight: 600, color: 'var(--c-gray-900)' }}>{row.size}</td>
                        <td style={{ padding: '8px 14px', color: 'var(--c-gray-700)' }}>{row.age}</td>
                        <td style={{ padding: '8px 14px', color: 'var(--c-gray-700)' }}>{row.poids}</td>
                        <td style={{ padding: '8px 14px', color: 'var(--c-gray-700)' }}>{row.taille}</td>
                        <td style={{ padding: '8px 14px', color: 'var(--c-gray-700)' }}>{row.poitrine}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: '16px 28px 24px', borderTop: '1px solid var(--c-gray-100)' }}>
                <p style={{ fontSize: 11, color: 'var(--c-gray-500)', lineHeight: 1.6 }}>
                  <strong>Conseil :</strong> Les tailles sont indicatives. Pour un meilleur ajustement, prenez les mesures de votre enfant et comparez-les avec le tableau. Si votre enfant se situe entre deux tailles, nous vous recommandons de prendre la taille supérieure.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
