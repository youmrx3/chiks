import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiChevronLeft, FiTruck, FiCreditCard, FiSmartphone, FiPackage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import formatCurrency from '../../utils/formatCurrency';
import wilayas from '../../data/wilayas';
import BreadCrumb from '../../components/client/BreadCrumb';

const STEPS = [
  { key: 'shipping', label: 'Livraison' },
  { key: 'payment', label: 'Paiement' },
  { key: 'confirm', label: 'Confirmation' },
];

const DELIVERY_METHODS = [
  { id: 'standard', name: 'Standard', price: 0, delay: '3-5 jours ouvrés', logo: '📦' },
  { id: 'express', name: 'Express', price: 500, delay: '24-48h', logo: '🚀' },
];

const PAYMENT_METHODS = [
  { id: 'cod', name: 'Paiement à la livraison', icon: FiTruck, desc: 'Payez en espèces à la réception de votre commande.' },
  { id: 'cib', name: 'Carte CIB', icon: FiCreditCard, desc: 'Payez par carte bancaire CIB.' },
  { id: 'edahabia', name: 'Carte Edahabia', icon: FiSmartphone, desc: 'Payez avec votre carte Edahabia.' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, shippingCost, total, clearCart } = useCart();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    phone: '',
    fullName: '',
    address: '',
    wilaya: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'standard',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    edahabiaNumber: '',
    notes: '',
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const cartItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      lineTotal: item.unitPrice * item.qty,
    }));
  }, [items]);

  const orderSubtotal = subtotal;
  const deliveryPrice = form.deliveryMethod === 'express' ? 500 : 0;
  const orderTotal = orderSubtotal + deliveryPrice;

  const isShippingValid = () => {
    return form.email && /\S+@\S+\.\S+/.test(form.email) &&
      form.phone && form.phone.length >= 8 &&
      form.fullName && form.address && form.wilaya && form.city;
  };

  const handleNext = () => {
    if (step === 0 && !isShippingValid()) {
      toast.error('Veuillez remplir tous les champs obligatoires de livraison.');
      return;
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      const orderId = `CMD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
      clearCart();
      setLoading(false);
      navigate(`/confirmation/${orderId}`);
    }, 1500);
  };

  if (items.length === 0 && !loading) {
    return (
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 32px 80px' }}>
        <BreadCrumb items={[{ label: 'Accueil', link: '/' }, { label: 'Commande' }]} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', textAlign: 'center' }}>
          <FiPackage size={64} style={{ color: 'var(--c-gray-300)', marginBottom: 16 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-xl)', color: 'var(--c-gray-900)', marginBottom: 8 }}>
            Votre panier est vide
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-500)', marginBottom: 32 }}>
            Ajoutez des articles avant de passer commande.
          </p>
          <button onClick={() => navigate('/boutique')}
            style={{ height: 48, padding: '0 36px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-base)', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
          >
            Découvrir la boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 32px 64px' }}>
      <BreadCrumb items={[{ label: 'Accueil', link: '/' }, { label: 'Panier', link: '/panier' }, { label: 'Commande' }]} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, marginBottom: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {STEPS.map((s, i) => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: i <= step ? 'var(--c-yellow)' : 'var(--c-gray-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i <= step ? 'var(--c-gray-900)' : 'var(--c-gray-500)',
                  fontWeight: 700, fontSize: 'var(--text-sm)',
                  transition: 'background 0.3s',
                }}>
                  {i < step ? <FiCheck size={18} /> : i + 1}
                </div>
                <span style={{
                  fontSize: 'var(--text-sm)', fontWeight: i <= step ? 600 : 400,
                  color: i <= step ? 'var(--c-gray-900)' : 'var(--c-gray-500)',
                }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  width: 60, height: 2, margin: '0 12px',
                  background: i < step ? 'var(--c-yellow)' : 'var(--c-gray-100)',
                  transition: 'background 0.3s',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}
        className="checkout-layout"
      >
        <style>{`@media (max-width: 900px) { .checkout-layout { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 && (
            <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-card)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--c-gray-900)', marginBottom: 24 }}>
                Informations de contact
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
                  className="contact-grid"
                >
                  <style>{`@media (max-width: 480px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
                  <div>
                    <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                      Email <span style={{ color: 'var(--c-red)' }}>*</span>
                    </label>
                    <input
                      type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                      placeholder="votre@email.com"
                      style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                      Téléphone <span style={{ color: 'var(--c-red)' }}>*</span>
                    </label>
                    <input
                      type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)}
                      placeholder="+213 055X XX XX XX"
                      style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)' }}
                    />
                  </div>
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--c-gray-900)', marginTop: 32, marginBottom: 24 }}>
                Adresse de livraison
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                    Nom complet <span style={{ color: 'var(--c-red)' }}>*</span>
                  </label>
                  <input
                    type="text" value={form.fullName} onChange={(e) => update('fullName', e.target.value)}
                    placeholder="Votre nom et prénom"
                    style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                    Adresse <span style={{ color: 'var(--c-red)' }}>*</span>
                  </label>
                  <input
                    type="text" value={form.address} onChange={(e) => update('address', e.target.value)}
                    placeholder="Rue, cité, lotissement, n°..."
                    style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}
                  className="address-grid"
                >
                  <style>{`@media (max-width: 600px) { .address-grid { grid-template-columns: 1fr !important; } }`}</style>
                  <div>
                    <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                      Wilaya <span style={{ color: 'var(--c-red)' }}>*</span>
                    </label>
                    <select
                      value={form.wilaya} onChange={(e) => update('wilaya', e.target.value)}
                      style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)', cursor: 'pointer' }}
                    >
                      <option value="">Sélectionnez</option>
                      {wilayas.map((w) => (
                        <option key={w.id} value={w.name}>{w.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                      Ville <span style={{ color: 'var(--c-red)' }}>*</span>
                    </label>
                    <input
                      type="text" value={form.city} onChange={(e) => update('city', e.target.value)}
                      placeholder="Votre ville"
                      style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                      Code postal
                    </label>
                    <input
                      type="text" value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)}
                      placeholder="16000"
                      style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 6, display: 'block' }}>
                    Notes pour la livraison
                  </label>
                  <textarea
                    value={form.notes} onChange={(e) => update('notes', e.target.value)}
                    placeholder="Instructions particulières..."
                    rows={3}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-base)', background: 'var(--c-offwhite)', resize: 'vertical' }}
                  />
                </div>
              </div>

              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--c-gray-900)', marginTop: 32, marginBottom: 16 }}>
                Mode de livraison
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {DELIVERY_METHODS.map((dm) => (
                  <label
                    key={dm.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16, padding: 16,
                      borderRadius: 'var(--radius-md)', cursor: 'pointer',
                      border: `1px solid ${form.deliveryMethod === dm.id ? 'var(--c-yellow)' : 'var(--c-gray-100)'}`,
                      background: form.deliveryMethod === dm.id ? 'var(--c-yellow-pale)' : 'var(--c-white)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <input
                      type="radio" name="delivery" value={dm.id}
                      checked={form.deliveryMethod === dm.id}
                      onChange={(e) => update('deliveryMethod', e.target.value)}
                      style={{ accentColor: 'var(--c-yellow)', width: 18, height: 18 }}
                    />
                    <span style={{ fontSize: 24 }}>{dm.logo}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}>
                        {dm.name} {dm.price === 0 ? '(Gratuite)' : `(+${formatCurrency(dm.price)})`}
                      </p>
                      <p style={{ fontSize: 11, color: 'var(--c-gray-500)', marginTop: 2 }}>{dm.delay}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <button onClick={() => navigate('/panier')}
                  style={{ height: 48, padding: '0 28px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', color: 'var(--c-gray-700)', fontWeight: 600, fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: 6, transition: 'border-color 0.2s' }}
                >
                  <FiChevronLeft size={16} />
                  Retour au panier
                </button>
                <button onClick={handleNext}
                  style={{ flex: 1, height: 48, borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-base)', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
                >
                  Continuer vers le paiement
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-lg)', padding: 32, boxShadow: 'var(--shadow-card)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--c-gray-900)', marginBottom: 24 }}>
                Mode de paiement
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PAYMENT_METHODS.map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = form.paymentMethod === pm.id;
                  return (
                    <label
                      key={pm.id}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 14, padding: 16,
                        borderRadius: 'var(--radius-md)', cursor: 'pointer',
                        border: `1px solid ${isSelected ? 'var(--c-yellow)' : 'var(--c-gray-100)'}`,
                        background: isSelected ? 'var(--c-yellow-pale)' : 'var(--c-white)',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio" name="payment" value={pm.id}
                        checked={isSelected}
                        onChange={(e) => update('paymentMethod', e.target.value)}
                        style={{ accentColor: 'var(--c-yellow)', width: 18, height: 18, marginTop: 2 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Icon size={20} style={{ color: 'var(--c-yellow-deep)' }} />
                          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}>{pm.name}</span>
                        </div>
                        <p style={{ fontSize: 11, color: 'var(--c-gray-500)', marginTop: 4 }}>{pm.desc}</p>
                        {isSelected && pm.id === 'cib' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--c-gray-100)' }}>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 4, display: 'block' }}>Numéro de carte</label>
                              <input type="text" value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} placeholder="1234 5678 9012 3456" maxLength={19}
                                style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)', background: 'var(--c-offwhite)' }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 4, display: 'block' }}>Date d'expiration</label>
                                <input type="text" value={form.cardExpiry} onChange={(e) => update('cardExpiry', e.target.value)} placeholder="MM/AA" maxLength={5}
                                  style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)', background: 'var(--c-offwhite)' }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 4, display: 'block' }}>CVV</label>
                                <input type="text" value={form.cardCvv} onChange={(e) => update('cardCvv', e.target.value)} placeholder="123" maxLength={3}
                                  style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)', background: 'var(--c-offwhite)' }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {isSelected && pm.id === 'edahabia' && (
                          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--c-gray-100)' }}>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--c-gray-700)', marginBottom: 4, display: 'block' }}>Numéro de carte Edahabia</label>
                              <input type="text" value={form.edahabiaNumber} onChange={(e) => update('edahabiaNumber', e.target.value)} placeholder="XXXX XXXX XXXX XXXX" maxLength={19}
                                style={{ width: '100%', height: 44, padding: '0 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)', background: 'var(--c-offwhite)' }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              <div style={{ marginTop: 32, padding: 20, borderRadius: 'var(--radius-md)', background: 'var(--c-offwhite)' }}>
                <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)', marginBottom: 12 }}>Récapitulatif de la commande</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {cartItems.map((item) => (
                    <div key={`${item.productId}-${item.size}-${item.color}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name} × {item.qty}
                      </span>
                      <span style={{ fontWeight: 600, marginLeft: 12 }}>{formatCurrency(item.lineTotal)}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid var(--c-gray-100)', marginTop: 12, paddingTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
                    <span>Sous-total</span>
                    <span>{formatCurrency(orderSubtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)', marginTop: 4 }}>
                    <span>Livraison ({form.deliveryMethod === 'express' ? 'Express' : 'Standard'})</span>
                    <span>{deliveryPrice === 0 ? 'Gratuite' : formatCurrency(deliveryPrice)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--c-gray-900)', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--c-gray-100)' }}>
                    <span>Total</span>
                    <span>{formatCurrency(orderTotal)}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <button onClick={handleBack}
                  style={{ height: 48, padding: '0 28px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', color: 'var(--c-gray-700)', fontWeight: 600, fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: 6, transition: 'border-color 0.2s' }}
                >
                  <FiChevronLeft size={16} />
                  Retour
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  style={{
                    flex: 1, height: 48, borderRadius: 'var(--radius-pill)',
                    background: loading ? 'var(--c-gray-300)' : 'var(--c-yellow)',
                    color: loading ? 'var(--c-gray-500)' : 'var(--c-gray-900)',
                    fontWeight: 700, fontSize: 'var(--text-base)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
                  onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = 'var(--c-yellow)'; }}
                >
                  {loading ? (
                    <>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--c-gray-500)', borderTopColor: 'transparent', animation: 'spin 0.6s linear infinite' }} />
                      Traitement en cours...
                    </>
                  ) : (
                    `Confirmer la commande — ${formatCurrency(orderTotal)}`
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 2 && null}
        </motion.div>

        <div style={{ position: 'sticky', top: 100 }}
          className="checkout-summary"
        >
          <style>{`@media (max-width: 900px) { .checkout-summary { display: none; } }`}</style>
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', padding: 28 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)', color: 'var(--c-gray-900)', marginBottom: 20 }}>
              Résumé
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} style={{ display: 'flex', gap: 12 }}>
                  <img src={item.image} alt={item.name}
                    style={{ width: 56, height: 56, borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-gray-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ fontSize: 10, color: 'var(--c-gray-500)', marginTop: 2 }}>×{item.qty}</p>
                    <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-gray-900)', marginTop: 4 }}>{formatCurrency(item.lineTotal)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--c-gray-100)', marginTop: 16, paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)' }}>
                <span>Sous-total</span>
                <span>{formatCurrency(orderSubtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)', marginTop: 6 }}>
                <span>Livraison</span>
                <span>{deliveryPrice === 0 ? 'Gratuite' : formatCurrency(deliveryPrice)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--c-gray-900)', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--c-gray-100)' }}>
                <span>Total</span>
                <span>{formatCurrency(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
