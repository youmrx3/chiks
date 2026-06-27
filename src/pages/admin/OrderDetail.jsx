import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPrinter, FiChevronLeft, FiMapPin, FiCheck,
  FiX, FiTruck, FiRotateCcw, FiSend,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { format, parseISO } from 'date-fns';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import formatCurrency from '../../utils/formatCurrency';
import { formatDateLong, timeAgo } from '../../utils/formatDate';
import orders from '../../data/orders';

const paymentLabels = {
  cash_on_delivery: 'Paiement à la livraison',
  cib: 'CIB',
  edahabia: 'Edahabia',
};

const statusColors = {
  pending: 'var(--c-gray-500)',
  confirmed: 'var(--c-blue)',
  processing: 'var(--c-yellow)',
  shipped: 'var(--c-mint)',
  delivered: 'var(--c-green)',
  cancelled: 'var(--c-red)',
  returned: 'var(--c-orange)',
};

const statusLabelMap = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  processing: 'En traitement',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
  returned: 'Retournée',
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [internalNote, setInternalNote] = useState('');
  const [paid, setPaid] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
        style={{ textAlign: 'center', padding: '80px 20px' }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '8px' }}>
          Commande introuvable
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--c-gray-500)', marginBottom: '24px' }}>
          La commande avec l'ID "{id}" n'existe pas.
        </p>
        <button
          onClick={() => navigate('/admin/commandes')}
          style={{ padding: '10px 24px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, border: 'none', fontSize: '13px' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
        >
          Retour aux commandes
        </button>
      </motion.div>
    );
  }

  const handleUpdateStatus = () => {
    if (!newStatus) return;
    toast.success(`Statut mis à jour : ${statusLabelMap[newStatus] || newStatus}`);
    setNewStatus('');
    setStatusNote('');
  };

  const handleAction = (action) => {
    const msgs = {
      confirm: 'Commande confirmée',
      ship: 'Marquée comme expédiée',
      deliver: 'Marquée comme livrée',
      cancel: 'Commande annulée',
      refund: 'Remboursement initié',
    };
    toast.success(msgs[action] || action);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <button
        onClick={() => navigate('/admin/commandes')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--c-gray-500)', marginBottom: '20px', fontWeight: 500 }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--c-gray-900)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--c-gray-500)'; }}
      >
        <FiChevronLeft size={16} /> Retour aux commandes
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '65fr 35fr', gap: '20px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Détails de la commande */}
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--c-gray-50)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--c-gray-900)', fontFamily: 'monospace' }}>
                  {order.id}
                </h2>
                <span style={{ fontSize: '12px', color: 'var(--c-gray-500)' }}>{formatDateLong(order.createdAt)}</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', background: 'transparent', color: 'var(--c-gray-700)', fontSize: '12px', fontWeight: 600 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <FiPrinter size={15} /> Imprimer
              </button>
            </div>
            <div style={{ padding: '20px 24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--c-gray-50)' }}>
                    <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Image</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Produit</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Taille/Couleur</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Qté</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Prix unitaire</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--c-gray-50)' }}>
                      <td style={{ padding: '10px 12px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 600 }}>{item.name}</td>
                      <td style={{ padding: '10px 12px', fontSize: '12px', color: 'var(--c-gray-700)' }}>{item.size} · {item.color}</td>
                      <td style={{ padding: '10px 12px', fontSize: '13px', textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ padding: '10px 12px', fontSize: '13px', textAlign: 'right' }}>{formatCurrency(item.unitPrice)}</td>
                      <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 700, textAlign: 'right' }}>{formatCurrency(item.totalPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ borderTop: '2px solid var(--c-gray-50)', padding: '16px 12px 0', marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '40px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', fontSize: '12px', color: 'var(--c-gray-500)', marginBottom: '4px' }}>
                      <span>Sous-total</span><span style={{ fontWeight: 600, color: 'var(--c-gray-900)' }}>{formatCurrency(order.subtotal)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', fontSize: '12px', color: 'var(--c-gray-500)', marginBottom: '4px' }}>
                      <span>Livraison</span><span style={{ fontWeight: 600, color: 'var(--c-gray-900)' }}>{order.shippingCost === 0 ? 'Gratuite' : formatCurrency(order.shippingCost)}</span>
                    </div>
                    {order.discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', fontSize: '12px', color: 'var(--c-red)', marginBottom: '4px' }}>
                        <span>Code {order.discountCode || 'promo'}</span><span style={{ fontWeight: 600 }}>-{formatCurrency(order.discountAmount)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', fontSize: '15px', fontWeight: 700, color: 'var(--c-gray-900)', borderTop: '1px solid var(--c-gray-100)', paddingTop: '8px', marginTop: '8px' }}>
                      <span>Total TTC</span><span>{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Historique */}
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Historique
            </h3>
            <div style={{ position: 'relative' }}>
              {order.timeline.map((entry, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', paddingBottom: i < order.timeline.length - 1 ? '20px' : '0', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '14px', flexShrink: 0 }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: statusColors[entry.status] || 'var(--c-gray-300)', border: '2px solid var(--c-white)', boxShadow: '0 0 0 2px ' + (statusColors[entry.status] || 'var(--c-gray-300)'), zIndex: 1 }} />
                    {i < order.timeline.length - 1 && (
                      <div style={{ width: '2px', flex: 1, background: 'var(--c-gray-100)', minHeight: '16px', marginTop: '2px' }} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-gray-900)' }}>
                      {statusLabelMap[entry.status] || entry.status}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', marginTop: '1px' }}>
                      {formatDateLong(entry.date)}
                    </div>
                    {entry.note && (
                      <div style={{ fontSize: '12px', color: 'var(--c-gray-700)', marginTop: '4px', fontStyle: 'italic' }}>
                        {entry.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--c-gray-50)' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '6px' }}>
                Ajouter une note interne
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Note interne..."
                  style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}
                />
                <button
                  onClick={() => { if (internalNote.trim()) { toast.success('Note ajoutée'); setInternalNote(''); } }}
                  style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 600, fontSize: '12px', border: 'none' }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>

          {/* Mettre à jour le statut */}
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Mettre à jour le statut
            </h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                style={{ flex: 1, minWidth: '140px', padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)' }}
              >
                <option value="">Sélectionner un statut</option>
                {Object.entries(statusLabelMap).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <input
                type="text"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Note (optionnelle)"
                style={{ flex: 1, minWidth: '160px', padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}
              />
              <button
                onClick={handleUpdateStatus}
                style={{ padding: '9px 20px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '13px', border: 'none', whiteSpace: 'nowrap' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
              >
                Mettre à jour
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Client */}
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Client
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, flexShrink: 0 }}>
                {order.customer.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--c-gray-900)' }}>{order.customer.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--c-gray-500)' }}>{order.customer.email}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--c-gray-700)' }}>
              <div><span style={{ color: 'var(--c-gray-500)' }}>Téléphone :</span> {order.customer.phone}</div>
              <div><span style={{ color: 'var(--c-gray-500)' }}>Wilaya :</span> {order.shippingAddress.wilaya}</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-mint-pale)', color: 'var(--c-mint-deep)', fontSize: '11px', fontWeight: 600 }}>
                  {order.orderCount || '—'} commandes
                </span>
                <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', fontSize: '11px', fontWeight: 600 }}>
                  Total: {formatCurrency(order.totalSpent || order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Adresse
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--c-gray-700)', lineHeight: 1.7 }}>
              <div>{order.shippingAddress.fullName}</div>
              <div>{order.shippingAddress.address}</div>
              <div>{order.shippingAddress.city}, {order.shippingAddress.wilaya}</div>
              <div>{order.shippingAddress.postalCode}</div>
            </div>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: 'var(--c-blue)', marginTop: '12px' }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
            >
              <FiMapPin size={14} /> Voir sur la carte
            </button>
          </div>

          {/* Paiement */}
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Paiement
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--c-gray-700)' }}>Méthode</span>
              <span style={{ fontWeight: 600, fontSize: '13px' }}>{paymentLabels[order.paymentMethod] || order.paymentMethod}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: 'var(--c-gray-700)' }}>Statut</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: order.paymentStatus === 'paid' ? 'var(--c-green-pale)' : 'var(--c-orange-pale)', color: order.paymentStatus === 'paid' ? 'var(--c-green-deep)' : 'var(--c-orange-deep)', fontSize: '11px', fontWeight: 600 }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: order.paymentStatus === 'paid' ? 'var(--c-green)' : 'var(--c-orange)' }} />
                {order.paymentStatus === 'paid' ? 'Payé' : 'Impayé'}
              </span>
            </div>
            <button
              onClick={() => { setPaid(!paid); toast.success(paid ? 'Marqué comme impayé' : 'Marqué comme payé'); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--c-green-pale)', color: 'var(--c-green-deep)', fontSize: '12px', fontWeight: 600, border: '1px solid var(--c-green-pale)', transition: 'all 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-green)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-green-pale)'; e.currentTarget.style.color = 'var(--c-green-deep)'; }}
            >
              <FiCheck size={14} /> {paid ? 'Marquer impayé' : 'Marquer payé'}
            </button>
          </div>

          {/* Actions rapides */}
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Actions rapides
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={() => handleAction('confirm')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', background: 'transparent', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', transition: 'all 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-blue-pale)'; e.currentTarget.style.color = 'var(--c-blue)'; e.currentTarget.style.borderColor = 'var(--c-blue-pale)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-700)'; e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
              >
                <FiCheck size={15} /> Confirmer la commande
              </button>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button onClick={() => handleAction('ship')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', background: 'transparent', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', transition: 'all 0.15s', flex: 1 }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-mint-pale)'; e.currentTarget.style.color = 'var(--c-mint-deep)'; e.currentTarget.style.borderColor = 'var(--c-mint-pale)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-700)'; e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
                >
                  <FiTruck size={15} /> Expédier
                </button>
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="N° suivi"
                  style={{ width: '110px', padding: '9px 10px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '12px' }}
                />
              </div>
              <button onClick={() => handleAction('deliver')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', background: 'transparent', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', transition: 'all 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-green-pale)'; e.currentTarget.style.color = 'var(--c-green-deep)'; e.currentTarget.style.borderColor = 'var(--c-green-pale)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-700)'; e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
              >
                <FiCheck size={15} /> Marquer livrée
              </button>
              <button onClick={() => handleAction('cancel')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', background: 'transparent', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', transition: 'all 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-red-pale)'; e.currentTarget.style.color = 'var(--c-red)'; e.currentTarget.style.borderColor = 'var(--c-red-pale)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-700)'; e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
              >
                <FiX size={15} /> Annuler la commande
              </button>
              <button onClick={() => handleAction('refund')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', background: 'transparent', fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-700)', transition: 'all 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-orange-pale)'; e.currentTarget.style.color = 'var(--c-orange-deep)'; e.currentTarget.style.borderColor = 'var(--c-orange-pale)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-700)'; e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
              >
                <FiRotateCcw size={15} /> Rembourser
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
