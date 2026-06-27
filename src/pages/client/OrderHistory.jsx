import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiEye, FiChevronRight } from 'react-icons/fi';
import orders from '../../data/orders';
import formatCurrency from '../../utils/formatCurrency';
import { formatDateShort } from '../../utils/formatDate';
import BreadCrumb from '../../components/client/BreadCrumb';

const STATUS_COLORS = {
  pending: { bg: 'var(--c-orange-pale)', color: 'var(--c-orange-deep)' },
  confirmed: { bg: 'var(--c-blue-pale)', color: 'var(--c-blue-deep)' },
  processing: { bg: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)' },
  shipped: { bg: 'var(--c-blue-pale)', color: 'var(--c-blue-deep)' },
  delivered: { bg: 'var(--c-green-pale)', color: 'var(--c-green-deep)' },
  cancelled: { bg: 'var(--c-red-pale)', color: 'var(--c-red-deep)' },
};

const STATUS_LABELS = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  processing: 'En cours',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

const MOCK_USER_EMAIL = 'amira.khelif@gmail.com';

export default function OrderHistory() {
  const userOrders = useMemo(() => {
    const userOrdersList = orders.filter((o) => o.customer.email === MOCK_USER_EMAIL);
    return userOrdersList.length > 0 ? userOrdersList : orders.slice(0, 3).map((o) => ({
      ...o,
      customer: { ...o.customer, email: MOCK_USER_EMAIL, name: 'Amira Khelif' },
    }));
  }, []);

  const finalOrders = userOrders.length > 0 ? userOrders : orders.slice(2, 5).map((o) => ({
    ...o,
    customer: { ...o.customer, email: MOCK_USER_EMAIL, name: 'Amira Khelif' },
  }));

  if (finalOrders.length === 0) {
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 32px 80px' }}>
        <BreadCrumb items={[{ label: 'Accueil', link: '/' }, { label: 'Mes commandes' }]} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', textAlign: 'center' }}>
          <FiPackage size={64} style={{ color: 'var(--c-gray-300)', marginBottom: 16 }} />
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-xl)', color: 'var(--c-gray-900)', marginBottom: 8 }}>
            Aucune commande
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-500)', marginBottom: 32, maxWidth: 400 }}>
            Vous n'avez pas encore passé de commande. Découvrez notre collection !
          </p>
          <Link to="/boutique"
            style={{ height: 48, padding: '0 36px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-base)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
          >
            Découvrir la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 32px 64px' }}>
      <BreadCrumb items={[{ label: 'Accueil', link: '/' }, { label: 'Mes commandes' }]} />

      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--c-gray-900)', marginTop: 16, marginBottom: 32 }}>
        Mes commandes ({finalOrders.length})
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {finalOrders.map((order) => {
          const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
          const statusLabel = STATUS_LABELS[order.status] || order.status;
          return (
            <div
              key={order.id}
              style={{
                background: 'var(--c-white)', borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-card)', padding: 24, transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-card)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>Numéro de commande</p>
                  <p style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--c-gray-900)' }}>{order.id}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>Date</p>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-700)' }}>{formatDateShort(order.createdAt)}</p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                  <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-pill)', background: statusStyle.bg, color: statusStyle.color, fontSize: 11, fontWeight: 700 }}>
                    {statusLabel}
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)' }}>
                    {order.items.length} article{order.items.length > 1 ? 's' : ''}
                  </span>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--c-gray-900)' }}>
                    {formatCurrency(order.total)}
                  </span>
                </div>
                <Link
                  to={`/mes-commandes`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, height: 40, padding: '0 20px',
                    borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)',
                    fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-gray-700)',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--c-gray-300)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--c-gray-100)'}
                >
                  Voir détails
                  <FiChevronRight size={14} />
                </Link>
              </div>

              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingTop: 12, borderTop: '1px solid var(--c-gray-50)' }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-gray-900)', whiteSpace: 'nowrap' }}>{item.name}</p>
                      <p style={{ fontSize: 10, color: 'var(--c-gray-500)' }}>×{item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
