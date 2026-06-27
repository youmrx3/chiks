import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiAward, FiMapPin, FiMail, FiPhone, FiCalendar, FiTag } from 'react-icons/fi';
import toast from 'react-hot-toast';
import formatCurrency from '../../utils/formatCurrency';
import { formatDateShort, timeAgo } from '../../utils/formatDate';
import customers from '../../data/customers';
import orders from '../../data/orders';

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');

  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
        style={{ textAlign: 'center', padding: '80px 20px' }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>👤</div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '8px' }}>
          Client introuvable
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--c-gray-500)', marginBottom: '24px' }}>
          Le client avec l'ID "{id}" n'existe pas.
        </p>
        <button
          onClick={() => navigate('/admin/clients')}
          style={{ padding: '10px 24px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, border: 'none', fontSize: '13px' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
        >
          Retour aux clients
        </button>
      </motion.div>
    );
  }

  const customerOrders = orders.filter((o) => o.customer.name === customer.fullName);
  const recentActivity = [
    { type: 'commande', text: `Commande #${customerOrders[0]?.id || 'N/A'} passée`, time: timeAgo(customer.lastOrderDate) },
    { type: 'connexion', text: 'Dernière connexion', time: 'Il y a 3 jours' },
    { type: 'favori', text: 'A ajouté "Combinaison Tricot Ours" aux favoris', time: 'Il y a 1 semaine' },
    { type: 'avis', text: 'A laissé un avis 5 étoiles', time: 'Il y a 2 semaines' },
  ];

  const activityDots = {
    commande: 'var(--c-blue)',
    connexion: 'var(--c-green)',
    favori: 'var(--c-yellow)',
    avis: 'var(--c-mint)',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <button
        onClick={() => navigate('/admin/clients')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--c-gray-500)', marginBottom: '20px', fontWeight: 500 }}
        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--c-gray-900)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--c-gray-500)'; }}
      >
        <FiChevronLeft size={16} /> Retour aux clients
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '40fr 60fr', gap: '20px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '24px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, margin: '0 auto 12px' }}>
              {customer.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--c-gray-900)' }}>{customer.fullName}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
              {customer.isVIP && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', fontSize: '11px', fontWeight: 600 }}>
                  <FiAward size={12} /> VIP
                </span>
              )}
              {customer.tags?.map((tag) => (
                <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-gray-50)', color: 'var(--c-gray-700)', fontSize: '11px', fontWeight: 500 }}>
                  <FiTag size={10} /> {tag}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', fontSize: '12px', color: 'var(--c-gray-700)', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiMail size={14} style={{ color: 'var(--c-gray-500)' }} /> {customer.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiPhone size={14} style={{ color: 'var(--c-gray-500)' }} /> {customer.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiMapPin size={14} style={{ color: 'var(--c-gray-500)' }} /> {customer.wilaya}, {customer.city}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiCalendar size={14} style={{ color: 'var(--c-gray-500)' }} /> Membre depuis {formatDateShort(customer.joinDate)}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Statistiques
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Commandes', value: customer.orderCount },
                { label: 'Total dépensé', value: formatCurrency(customer.totalSpent) },
                { label: 'Panier moyen', value: formatCurrency(customer.avgOrderValue) },
                { label: 'Dernière commande', value: formatDateShort(customer.lastOrderDate) },
              ].map((s) => (
                <div key={s.label} style={{ padding: '12px', borderRadius: 'var(--radius-sm)', background: 'var(--c-gray-50)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--c-gray-500)', fontWeight: 500, textTransform: 'uppercase' }}>{s.label}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--c-gray-900)', marginTop: '2px' }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Notes
            </h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ajouter une note sur ce client..."
              rows={4}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', resize: 'vertical', marginBottom: '10px' }}
            />
            <button
              onClick={() => { setSavedNote(note); toast.success('Note enregistrée'); }}
              style={{ padding: '8px 20px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '12px', border: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
            >
              Enregistrer
            </button>
            {savedNote && (
              <div style={{ marginTop: '12px', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--c-yellow-pale)', fontSize: '12px', color: 'var(--c-gray-700)', fontStyle: 'italic' }}>
                {savedNote}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--c-gray-50)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Historique des commandes ({customerOrders.length})
              </h3>
            </div>
            {customerOrders.length === 0 ? (
              <div style={{ padding: '40px 24px', textAlign: 'center', fontSize: '13px', color: 'var(--c-gray-500)' }}>
                Aucune commande trouvée.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--c-gray-100)' }}>
                      <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>N°</th>
                      <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Date</th>
                      <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Articles</th>
                      <th style={{ textAlign: 'right', padding: '10px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Total</th>
                      <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase' }}>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerOrders.map((o) => (
                      <tr key={o.id} style={{ borderBottom: '1px solid var(--c-gray-50)', cursor: 'pointer' }}
                        onClick={() => navigate(`/admin/commandes/${o.id}`)}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-pale)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--c-blue)', fontFamily: 'monospace' }}>{o.id}</td>
                        <td style={{ padding: '10px 16px', fontSize: '11px', color: 'var(--c-gray-500)' }}>{formatDateShort(o.createdAt)}</td>
                        <td style={{ padding: '10px 16px', fontSize: '12px' }}>{o.items.length} art.</td>
                        <td style={{ padding: '10px 16px', fontSize: '13px', fontWeight: 700, textAlign: 'right' }}>{formatCurrency(o.total)}</td>
                        <td style={{ padding: '10px 16px' }}>
                          <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 'var(--radius-pill)', fontSize: '10px', fontWeight: 600, background: o.status === 'delivered' ? 'var(--c-green-pale)' : o.status === 'shipped' ? 'var(--c-mint-pale)' : o.status === 'processing' ? 'var(--c-yellow-pale)' : 'var(--c-gray-50)', color: o.status === 'delivered' ? 'var(--c-green-deep)' : o.status === 'shipped' ? 'var(--c-mint-deep)' : o.status === 'processing' ? 'var(--c-yellow-deep)' : 'var(--c-gray-700)' }}>
                            {o.status === 'delivered' ? 'Livrée' : o.status === 'shipped' ? 'Expédiée' : o.status === 'processing' ? 'En traitement' : o.status === 'confirmed' ? 'Confirmée' : o.status === 'pending' ? 'En attente' : o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Adresses enregistrées
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[1, 2, 3].slice(0, customerOrders.length || 1).map((_, i) => {
                const o = customerOrders[i];
                return (
                  <div key={i} style={{ flex: 1, minWidth: '180px', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-gray-100)', fontSize: '12px', color: 'var(--c-gray-700)', lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 600, color: 'var(--c-gray-900)', marginBottom: '2px' }}>{o?.shippingAddress?.fullName || customer.fullName}</div>
                    <div>{o?.shippingAddress?.address || '—'}</div>
                    <div>{o?.shippingAddress?.city || '—'}, {o?.shippingAddress?.wilaya || customer.wilaya}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: '20px 24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Activité récente
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {recentActivity.map((act, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--c-gray-50)' : 'none' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: activityDots[act.type] || 'var(--c-gray-300)', marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--c-gray-900)' }}>{act.text}</div>
                    <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', marginTop: '1px' }}>{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
