import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiTrash2, FiMinus, FiPlus, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQty, subtotal, shippingCost, total } = useCart();
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const toggleOpen = () => {
    if (onClose) onClose();
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'CHICKS10') {
      setPromoApplied(true);
    }
  };

  const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
  const finalTotal = total - promoDiscount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={toggleOpen}
            style={{
              position: 'fixed', inset: 0, zIndex: 2000,
              background: 'rgba(30,29,27,0.5)',
            }}
          />
          <motion.aside
            initial={{ translateX: '100%' }}
            animate={{ translateX: 0 }}
            exit={{ translateX: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 2001,
              width: '100%', maxWidth: 400, background: 'var(--c-white)',
              display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-modal)',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px', borderBottom: '1px solid var(--c-gray-100)', flexShrink: 0,
            }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)' }}>
                Votre panier ({items.length})
              </h2>
              <button onClick={toggleOpen} style={{ padding: 8, borderRadius: '50%', color: 'var(--c-gray-500)', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-gray-50)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                aria-label="Fermer"
              >
                <FiX size={20} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
              {items.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', textAlign: 'center' }}>
                  <svg width="80" height="80" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 16, opacity: 0.3 }}>
                    <path d="M16 4C10 4 6 10 6 16C6 20 8 24 12 26C10 24 9 21 9 18C9 14 11 10 16 10C21 10 23 14 23 18C23 21 22 24 20 26C24 24 26 20 26 16C26 10 22 4 16 4Z" fill="var(--c-gray-300)"/>
                    <path d="M12 18C12 16 13 14 16 14C19 14 20 16 20 18C20 20 18 22 16 22C14 22 12 20 12 18Z" fill="var(--c-gray-500)"/>
                  </svg>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-700)', fontWeight: 600, marginBottom: 8 }}>
                    Votre panier est vide 🐣
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)', marginBottom: 24 }}>
                    Découvrez notre collection et ajoutez vos premiers articles.
                  </p>
                  <Link to="/boutique" onClick={toggleOpen}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      height: 44, padding: '0 28px', borderRadius: 'var(--radius-pill)',
                      background: 'var(--c-yellow)', color: 'var(--c-gray-900)',
                      fontWeight: 600, fontSize: 'var(--text-sm)',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
                  >
                    Découvrir la boutique
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}-${item.color}`} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--c-gray-50)' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 80, height: 80, borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                          <button onClick={() => removeItem(item.productId, item.size, item.color)} style={{ padding: 4, color: 'var(--c-gray-500)', flexShrink: 0 }}
                            aria-label="Retirer"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                          {item.size && (
                            <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: 'var(--c-gray-50)', fontSize: 10, fontWeight: 500, color: 'var(--c-gray-700)' }}>{item.size}</span>
                          )}
                          {item.color && (
                            <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: 'var(--c-gray-50)', fontSize: 10, fontWeight: 500, color: 'var(--c-gray-700)' }}>{item.color}</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)' }}>
                            <button onClick={() => updateQty(item.productId, item.size, item.color, item.qty - 1)} disabled={item.qty <= 1}
                              style={{ padding: '4px 8px', color: item.qty <= 1 ? 'var(--c-gray-300)' : 'var(--c-gray-700)', transition: 'color 0.2s' }}
                            ><FiMinus size={14} /></button>
                            <span style={{ minWidth: 24, textAlign: 'center', fontSize: 'var(--text-sm)', fontWeight: 600 }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.productId, item.size, item.color, item.qty + 1)}
                              style={{ padding: '4px 8px', color: 'var(--c-gray-700)', transition: 'color 0.2s' }}
                            ><FiPlus size={14} /></button>
                          </div>
                          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--c-gray-900)' }}>
                            {formatCurrency(item.unitPrice * item.qty)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div style={{ borderTop: '1px solid var(--c-gray-100)', padding: '16px 24px 24px', flexShrink: 0 }}>
                <button
                  onClick={() => setPromoOpen((o) => !o)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)', color: 'var(--c-gray-500)', fontWeight: 500, marginBottom: 8 }}
                >
                  {promoOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                  Code promo
                </button>

                <AnimatePresence>
                  {promoOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                        <input
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Entrez votre code"
                          disabled={promoApplied}
                          style={{
                            flex: 1, height: 40, padding: '0 12px', borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)',
                            background: promoApplied ? 'var(--c-green-pale)' : 'var(--c-offwhite)',
                            color: promoApplied ? 'var(--c-green)' : 'var(--c-gray-900)',
                          }}
                        />
                        <button
                          onClick={handleApplyPromo}
                          disabled={promoApplied || !promoCode.trim()}
                          style={{
                            height: 40, padding: '0 16px', borderRadius: 'var(--radius-sm)',
                            background: promoApplied ? 'var(--c-green)' : 'var(--c-gray-900)',
                            color: '#fff', fontSize: 'var(--text-xs)', fontWeight: 600,
                            opacity: (promoApplied || !promoCode.trim()) ? 0.5 : 1,
                            transition: 'background 0.2s',
                          }}
                        >
                          {promoApplied ? 'Appliqué ✓' : 'Appliquer'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
                    <span>Sous-total</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
                    <span>Livraison</span>
                    <span>{shippingCost === 0 ? 'Gratuite' : formatCurrency(shippingCost)}</span>
                  </div>
                  {promoApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-green)' }}>
                      <span>Promo (CHICKS10)</span>
                      <span>-{formatCurrency(promoDiscount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--c-gray-900)', borderTop: '1px solid var(--c-gray-100)', paddingTop: 8 }}>
                    <span>Total</span>
                    <span>{formatCurrency(finalTotal)}</span>
                  </div>
                </div>

                <Link
                  to="/commande"
                  onClick={toggleOpen}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: 48, width: '100%', borderRadius: 'var(--radius-pill)',
                    background: 'var(--c-yellow)', color: 'var(--c-gray-900)',
                    fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 10,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
                >
                  Passer la commande
                </Link>
                <Link
                  to="/boutique"
                  onClick={toggleOpen}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: 44, width: '100%', borderRadius: 'var(--radius-pill)',
                    color: 'var(--c-gray-700)', fontSize: 'var(--text-sm)', fontWeight: 500,
                    transition: 'color 0.2s',
                  }}
                >
                  Continuer mes achats
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
