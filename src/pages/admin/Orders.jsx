import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiEye, FiEdit2, FiPrinter, FiSearch, FiDownload,
  FiShoppingCart, FiClock, FiTruck, FiCheckCircle,
} from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import DataTable from '../../components/admin/DataTable';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import Pagination from '../../components/admin/Pagination';
import formatCurrency from '../../utils/formatCurrency';
import { formatDateShort } from '../../utils/formatDate';
import orders from '../../data/orders';
import wilayas from '../../data/wilayas';

const PER_PAGE = 20;

const statusTabs = [
  { key: 'all', label: 'Toutes', count: orders.length },
  { key: 'pending', label: 'En attente', count: orders.filter((o) => o.status === 'pending').length },
  { key: 'confirmed', label: 'Confirmées', count: orders.filter((o) => o.status === 'confirmed').length },
  { key: 'processing', label: 'En traitement', count: orders.filter((o) => o.status === 'processing').length },
  { key: 'shipped', label: 'Expédiées', count: orders.filter((o) => o.status === 'shipped').length },
  { key: 'delivered', label: 'Livrées', count: orders.filter((o) => o.status === 'delivered').length },
  { key: 'cancelled', label: 'Annulées', count: orders.filter((o) => o.status === 'cancelled').length },
  { key: 'returned', label: 'Retournées', count: orders.filter((o) => o.status === 'returned').length },
];

const paymentLabels = {
  cash_on_delivery: 'Paiement à la livraison',
  cib: 'CIB',
  edahabia: 'Edahabia',
};

const paymentColors = {
  cash_on_delivery: { bg: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)' },
  cib: { bg: 'var(--c-blue-pale)', color: 'var(--c-blue-deep)' },
  edahabia: { bg: 'var(--c-mint-pale)', color: 'var(--c-mint-deep)' },
};

export default function Orders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [wilayaFilter, setWilayaFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...orders];
    if (activeTab !== 'all') list = list.filter((o) => o.status === activeTab);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((o) =>
        o.id.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.phone.includes(q)
      );
    }
    if (dateRange === 'today') {
      const today = new Date().toISOString().slice(0, 10);
      list = list.filter((o) => o.createdAt.slice(0, 10) === today);
    }
    if (dateRange === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
      list = list.filter((o) => o.createdAt >= weekAgo);
    }
    if (dateRange === 'month') {
      const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString();
      list = list.filter((o) => o.createdAt >= monthAgo);
    }
    if (wilayaFilter) list = list.filter((o) => o.shippingAddress.wilaya === wilayaFilter);
    if (paymentFilter) list = list.filter((o) => o.paymentMethod === paymentFilter);
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }, [activeTab, search, dateRange, wilayaFilter, paymentFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const statCards = [
    { label: 'Aujourd\'hui', value: orders.filter((o) => o.createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10)).length, icon: FiShoppingCart, color: 'var(--c-yellow)' },
    { label: 'En attente', value: orders.filter((o) => o.status === 'pending').length, icon: FiClock, color: 'var(--c-orange)' },
    { label: 'Expédiées', value: orders.filter((o) => o.status === 'shipped').length, icon: FiTruck, color: 'var(--c-mint)' },
    { label: 'Livrées (mois)', value: orders.filter((o) => o.status === 'delivered' && o.createdAt >= new Date(Date.now() - 30 * 86400000).toISOString()).length, icon: FiCheckCircle, color: 'var(--c-green)' },
  ];

  const columns = [
    {
      key: 'id', label: 'N°', render: (row) => (
        <span style={{ color: 'var(--c-blue)', fontWeight: 600, fontFamily: 'monospace', fontSize: '12px', cursor: 'pointer' }}
          onClick={() => navigate(`/admin/commandes/${row.id}`)}
        >
          {row.id}
        </span>
      ),
    },
    {
      key: 'customer', label: 'Client', render: (row) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: '13px' }}>{row.customer.name}</div>
          <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>{row.customer.phone}</div>
        </div>
      ),
    },
    {
      key: 'wilaya', label: 'Wilaya', render: (row) => (
        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-gray-50)', color: 'var(--c-gray-700)', fontSize: '11px', fontWeight: 500 }}>
          {row.shippingAddress.wilaya}
        </span>
      ),
    },
    {
      key: 'createdAt', label: 'Date', render: (row) => (
        <div>
          <div style={{ fontSize: '12px', color: 'var(--c-gray-900)' }}>{formatDateShort(row.createdAt)}</div>
          <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>
            {format(parseISO(row.createdAt), 'HH:mm')}
          </div>
        </div>
      ),
    },
    {
      key: 'items', label: 'Articles', render: (row) => (
        <div style={{ position: 'relative' }}>
          <span style={{ cursor: 'pointer', borderBottom: '1px dashed var(--c-gray-300)' }}>
            {row.items.length} art.
          </span>
          <div style={{ display: 'none', position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: 'var(--c-gray-900)', color: '#fff', padding: '6px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', whiteSpace: 'nowrap', zIndex: 10 }}
            className="item-tooltip"
          >
            {row.items.map((it) => it.name).join(', ')}
          </div>
        </div>
      ),
    },
    {
      key: 'total', label: 'Total', render: (row) => (
        <span style={{ fontWeight: 700, fontSize: '13px' }}>{formatCurrency(row.total)}</span>
      ),
    },
    {
      key: 'payment', label: 'Paiement', render: (row) => {
        const pc = paymentColors[row.paymentMethod] || paymentColors.cash_on_delivery;
        return (
          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: pc.bg, color: pc.color, fontSize: '11px', fontWeight: 600 }}>
            {paymentLabels[row.paymentMethod] || row.paymentMethod}
          </span>
        );
      },
    },
    {
      key: 'status', label: 'Statut', render: (row) => <OrderStatusBadge status={row.status} />,
    },
    {
      key: 'actions', label: 'Actions', render: (row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => navigate(`/admin/commandes/${row.id}`)} style={{ padding: '5px', color: 'var(--c-gray-500)', borderRadius: '4px', display: 'flex' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-blue-pale)'; e.currentTarget.style.color = 'var(--c-blue)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
          >
            <FiEye size={14} />
          </button>
          <div style={{ position: 'relative' }}>
            <button style={{ padding: '5px', color: 'var(--c-gray-500)', borderRadius: '4px', display: 'flex' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-pale)'; e.currentTarget.style.color = 'var(--c-yellow-deep)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
            >
              <FiEdit2 size={14} />
            </button>
          </div>
          <button style={{ padding: '5px', color: 'var(--c-gray-500)', borderRadius: '4px', display: 'flex' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-mint-pale)'; e.currentTarget.style.color = 'var(--c-mint-deep)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
          >
            <FiPrinter size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--c-gray-900)', fontFamily: 'var(--font-display)' }}>
          Commandes
        </h1>
        <button
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', background: 'transparent', color: 'var(--c-gray-700)', fontSize: '13px', fontWeight: 600, transition: 'all 0.15s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <FiDownload size={16} /> Exporter CSV
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {statCards.map((card) => (
          <div key={card.label} style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', padding: '16px 20px', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: `${card.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, flexShrink: 0 }}>
              <card.icon size={18} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', fontWeight: 500, textTransform: 'uppercase' }}>{card.label}</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--c-gray-900)', lineHeight: 1.2 }}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setPage(1); }}
            style={{
              padding: '7px 16px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '12px',
              fontWeight: 600,
              background: activeTab === tab.key ? 'var(--c-yellow)' : 'var(--c-white)',
              color: activeTab === tab.key ? 'var(--c-gray-900)' : 'var(--c-gray-700)',
              border: activeTab === tab.key ? 'none' : '1px solid var(--c-gray-100)',
              boxShadow: activeTab === tab.key ? 'none' : 'var(--shadow-card)',
              transition: 'all 0.15s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.key) { e.currentTarget.style.background = 'var(--c-gray-50)'; }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.key) { e.currentTarget.style.background = 'var(--c-white)'; }
            }}
          >
            {tab.label}
            <span style={{ fontSize: '11px', opacity: 0.7 }}>({tab.count})</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '180px', maxWidth: '280px' }}>
          <FiSearch size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-gray-500)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Rechercher commande, client..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ width: '100%', padding: '9px 12px 9px 34px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--c-yellow)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
          />
        </div>
        <select value={dateRange} onChange={(e) => { setDateRange(e.target.value); setPage(1); }}
          style={{ padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)', minWidth: '130px' }}
        >
          <option value="">Toutes les dates</option>
          <option value="today">Aujourd'hui</option>
          <option value="week">7 derniers jours</option>
          <option value="month">30 derniers jours</option>
        </select>
        <select value={wilayaFilter} onChange={(e) => { setWilayaFilter(e.target.value); setPage(1); }}
          style={{ padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)', minWidth: '140px' }}
        >
          <option value="">Toutes les wilayas</option>
          {wilayas.map((w) => <option key={w.id} value={w.name}>{w.name}</option>)}
        </select>
        <select value={paymentFilter} onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
          style={{ padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)', minWidth: '140px' }}
        >
          <option value="">Tous les paiements</option>
          <option value="cash_on_delivery">Paiement à la livraison</option>
          <option value="cib">CIB</option>
          <option value="edahabia">Edahabia</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={paged}
        selectable
        onRowClick={(row) => navigate(`/admin/commandes/${row.id}`)}
      />

      <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} onPageChange={setPage} />

      <style>{`
        tr:hover .item-tooltip { display: block !important; }
      `}</style>
    </motion.div>
  );
}
