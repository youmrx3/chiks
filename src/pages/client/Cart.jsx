import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';
import BreadCrumb from '../../components/client/BreadCrumb';

export default function Cart() {
  const { items, removeItem, updateQty, subtotal, shippingCost, total } = useCart();
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'CHICKS10') {
      setPromoApplied(true);
      toast.success('Code promo appliqué ! -10%');
    } else {
      toast.error('Code promo invalide');
    }
  };

  const promoDiscount = promoApplied ? subtotal * 0.1 : 0;
  const finalTotal = total - promoDiscount;

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 32px 80px' }}>
        <BreadCrumb items={[{ label: 'Accueil', link: '/' }, { label: 'Panier' }]} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', textAlign: 'center' }}>
          <svg width="100" height="100" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 20, opacity: 0.25 }}>
            <path d="M16 4C10 4 6 10 6 16C6 20 8 24 12 26C10 24 9 21 9 18C9 14 11 10 16 10C21 10 23 14 23 18C23 21 22 24 20 26C24 24 26 20 26 16C26 10 22 4 16 4Z" fill="var(--c-gray-300)"/>
            <path d="M12 18C12 16 13 14 16 14C19 14 20 16 20 18C20 20 18 22 16 22C14 22 12 20 12 18Z" fill="var(--c-gray-500)"/>
          </svg>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-xl)', color: 'var(--c-gray-900)', marginBottom: 8 }}>
            Votre panier est vide 🐣
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-500)', marginBottom: 32, maxWidth: 400 }}>
            Découvrez notre collection et ajoutez vos premiers articles.
          </p>
          <Link to="/boutique"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 48, padding: '0 36px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-base)', gap: 8, transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
          >
            <FiShoppingBag size={18} />
            Découvrir la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '24px 32px 64px' }}>
      <BreadCrumb items={[{ label: 'Accueil', link: '/' }, { label: 'Panier' }]} />

      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--c-gray-900)', marginTop: 16, marginBottom: 32 }}>
        Votre panier ({items.length} article{items.length > 1 ? 's' : ''})
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}
        className="cart-layout"
      >
        <style>{`@media (max-width: 900px) { .cart-layout { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid var(--c-gray-100)' }}
                >
                  <Link to={`/produit/${item.productId}`} style={{ flexShrink: 0 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 100, height: 100, borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                    />
                  </Link>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                        <div>
                          <Link to={`/produit/${item.productId}`} style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--c-gray-900)', transition: 'color 0.2s' }}>
                            {item.name}
                          </Link>
                          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                            {item.size && <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-gray-50)', fontSize: 11, fontWeight: 500, color: 'var(--c-gray-700)' }}>{item.size}</span>}
                            {item.color && <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-gray-50)', fontSize: 11, fontWeight: 500, color: 'var(--c-gray-700)' }}>{item.color}</span>}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            removeItem(item.productId, item.size, item.color);
                            toast.success('Article retiré du panier');
                          }}
                          style={{ padding: 8, borderRadius: '50%', color: 'var(--c-gray-500)', flexShrink: 0, transition: 'background 0.2s, color 0.2s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-red-pale)'; e.currentTarget.style.color = 'var(--c-red)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)' }}>
                        <button
                          onClick={() => updateQty(item.productId, item.size, item.color, item.qty - 1)}
                          disabled={item.qty <= 1}
                          style={{ padding: '8px 12px', color: item.qty <= 1 ? 'var(--c-gray-300)' : 'var(--c-gray-700)', transition: 'color 0.2s' }}
                        >
                          <FiMinus size={14} />
                        </button>
                        <span style={{ minWidth: 32, textAlign: 'center', fontSize: 'var(--text-base)', fontWeight: 600 }}>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.size, item.color, item.qty + 1)}
                          style={{ padding: '8px 12px', color: 'var(--c-gray-700)', transition: 'color 0.2s' }}
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--c-gray-900)' }}>
                        {formatCurrency(item.unitPrice * item.qty)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Link to="/boutique"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 24, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-yellow-deep)', transition: 'color 0.2s', alignSelf: 'flex-start' }}
          >
            ← Continuer mes achats
          </Link>
        </div>

        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 28 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--c-gray-900)', marginBottom: 20 }}>
              Résumé de la commande
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
                <span>Sous-total</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
                <span>Livraison</span>
                <span>{shippingCost === 0 ? 'Gratuite' : formatCurrency(shippingCost)}</span>
              </div>
              {subtotal < 5000 && shippingCost > 0 && (
                <p style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>
                  Plus que {formatCurrency(5000 - subtotal)} pour la livraison offerte
                </p>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--c-gray-100)', marginTop: 12, paddingTop: 12 }}>
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
                          flex: 1, height: 44, padding: '0 14px', borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)',
                          background: promoApplied ? 'var(--c-green-pale)' : 'var(--c-offwhite)',
                          color: promoApplied ? 'var(--c-green)' : 'var(--c-gray-900)',
                        }}
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode.trim()}
                        style={{
                          height: 44, padding: '0 20px', borderRadius: 'var(--radius-sm)',
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
            </div>

            {promoApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-green)', paddingTop: 8 }}>
                <span>Promo (CHICKS10)</span>
                <span>-{formatCurrency(promoDiscount)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--c-gray-100)', marginTop: 12, paddingTop: 16 }}>
              <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--c-gray-900)' }}>Total</span>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--c-gray-900)' }}>{formatCurrency(finalTotal)}</span>
            </div>

            <Link
              to="/commande"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: 50, width: '100%', borderRadius: 'var(--radius-pill)',
                background: 'var(--c-yellow)', color: 'var(--c-gray-900)',
                fontWeight: 700, fontSize: 'var(--text-base)', marginTop: 20, gap: 8,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
            >
              <FiShoppingBag size={18} />
              Passer la commande
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
