import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiMail, FiSearch, FiAward } from 'react-icons/fi';
import DataTable from '../../components/admin/DataTable';
import Pagination from '../../components/admin/Pagination';
import formatCurrency from '../../utils/formatCurrency';
import { formatDateShort } from '../../utils/formatDate';
import customers from '../../data/customers';
import wilayas from '../../data/wilayas';

const PER_PAGE = 15;

export default function Customers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [wilayaFilter, setWilayaFilter] = useState('');
  const [vipOnly, setVipOnly] = useState(false);
  const [sort, setSort] = useState('name-asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...customers];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.fullName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q));
    }
    if (wilayaFilter) list = list.filter((c) => c.wilaya === wilayaFilter);
    if (vipOnly) list = list.filter((c) => c.isVIP);
    const [key, dir] = sort.split('-');
    list.sort((a, b) => {
      let va, vb;
      if (key === 'name') { va = a.fullName; vb = b.fullName; }
      else if (key === 'orders') { va = a.orderCount; vb = b.orderCount; }
      else if (key === 'spent') { va = a.totalSpent; vb = b.totalSpent; }
      else if (key === 'date') { va = a.joinDate; vb = b.joinDate; }
      else { va = a.fullName; vb = b.fullName; }
      if (typeof va === 'string') return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      return dir === 'asc' ? va - vb : vb - va;
    });
    return list;
  }, [search, wilayaFilter, vipOnly, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const monthsSince = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.floor(diff / (30 * 86400000));
  };

  const columns = [
    {
      key: 'avatar', label: '', render: (row) => (
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>
          {row.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
      ),
    },
    {
      key: 'name', label: 'Client', render: (row) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--c-gray-900)' }}>{row.fullName}</div>
          <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>{row.email}</div>
        </div>
      ),
    },
    {
      key: 'phone', label: 'Téléphone', render: (row) => (
        <span style={{ fontSize: '12px', color: 'var(--c-gray-700)' }}>{row.phone}</span>
      ),
    },
    {
      key: 'wilaya', label: 'Wilaya', render: (row) => (
        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-gray-50)', color: 'var(--c-gray-700)', fontSize: '11px', fontWeight: 500 }}>{row.wilaya}</span>
      ),
    },
    {
      key: 'joinDate', label: 'Inscription', render: (row) => (
        <div>
          <div style={{ fontSize: '12px', color: 'var(--c-gray-900)' }}>{formatDateShort(row.joinDate)}</div>
          <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>il y a {monthsSince(row.joinDate)} mois</div>
        </div>
      ),
    },
    {
      key: 'orderCount', label: 'Commandes', render: (row) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: '13px' }}>{row.orderCount}</div>
          <div style={{ fontSize: '10px', color: 'var(--c-gray-500)' }}>{formatDateShort(row.lastOrderDate)}</div>
        </div>
      ),
    },
    {
      key: 'totalSpent', label: 'Dépense totale', render: (row) => (
        <span style={{ fontWeight: 700, fontSize: '13px', color: row.totalSpent > 20000 ? 'var(--c-yellow-deep)' : 'var(--c-gray-900)' }}>
          {formatCurrency(row.totalSpent)}
        </span>
      ),
    },
    {
      key: 'isVIP', label: 'Statut', render: (row) => row.isVIP ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', fontSize: '11px', fontWeight: 600 }}>
          <FiAward size={12} /> VIP
        </span>
      ) : (
        <span style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>Standard</span>
      ),
    },
    {
      key: 'actions', label: 'Actions', render: (row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/clients/${row.id}`); }} style={{ padding: '5px', color: 'var(--c-gray-500)', borderRadius: '4px', display: 'flex' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-blue-pale)'; e.currentTarget.style.color = 'var(--c-blue)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
          >
            <FiEye size={14} />
          </button>
          <button style={{ padding: '5px', color: 'var(--c-gray-500)', borderRadius: '4px', display: 'flex' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-mint-pale)'; e.currentTarget.style.color = 'var(--c-mint-deep)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
          >
            <FiMail size={14} />
          </button>
        </div>
      ),
    },
  ];

  const totalCustomers = customers.length;
  const vipCount = customers.filter((c) => c.isVIP).length;
  const newThisMonth = customers.filter((c) => new Date(c.joinDate) >= new Date(Date.now() - 30 * 86400000)).length;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--c-gray-900)', fontFamily: 'var(--font-display)' }}>
          Clients
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', padding: '16px 20px', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--c-blue-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-blue)', flexShrink: 0 }}>
            <FiEye size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', fontWeight: 500, textTransform: 'uppercase' }}>Total clients</div>
            <div style={{ fontSize: '22px', fontWeight: 700 }}>{totalCustomers}</div>
          </div>
        </div>
        <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', padding: '16px 20px', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--c-yellow-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-yellow-deep)', flexShrink: 0 }}>
            <FiAward size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', fontWeight: 500, textTransform: 'uppercase' }}>VIP</div>
            <div style={{ fontSize: '22px', fontWeight: 700 }}>{vipCount}</div>
          </div>
        </div>
        <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', padding: '16px 20px', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--c-mint-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-mint-deep)', flexShrink: 0 }}>
            <FiMail size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', fontWeight: 500, textTransform: 'uppercase' }}>Nouveaux ce mois</div>
            <div style={{ fontSize: '22px', fontWeight: 700 }}>{newThisMonth}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '180px', maxWidth: '280px' }}>
          <FiSearch size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-gray-500)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ width: '100%', padding: '9px 12px 9px 34px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--c-yellow)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
          />
        </div>
        <select value={wilayaFilter} onChange={(e) => { setWilayaFilter(e.target.value); setPage(1); }}
          style={{ padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)', minWidth: '140px' }}
        >
          <option value="">Toutes les wilayas</option>
          {wilayas.map((w) => <option key={w.id} value={w.name}>{w.name}</option>)}
        </select>
        <button
          onClick={() => { setVipOnly(!vipOnly); setPage(1); }}
          style={{
            padding: '9px 16px', borderRadius: 'var(--radius-pill)', fontSize: '12px', fontWeight: 600,
            border: '1px solid', display: 'inline-flex', alignItems: 'center', gap: '5px',
            borderColor: vipOnly ? 'var(--c-yellow)' : 'var(--c-gray-100)',
            background: vipOnly ? 'var(--c-yellow-pale)' : 'var(--c-white)',
            color: vipOnly ? 'var(--c-yellow-deep)' : 'var(--c-gray-700)',
            transition: 'all 0.15s',
          }}
        >
          <FiAward size={14} /> VIP uniquement
        </button>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          style={{ padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)', minWidth: '150px' }}
        >
          <option value="name-asc">Nom A-Z</option>
          <option value="name-desc">Nom Z-A</option>
          <option value="orders-desc">Plus de commandes</option>
          <option value="spent-desc">Plus dépensé</option>
          <option value="date-desc">Plus récent</option>
          <option value="date-asc">Plus ancien</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={paged}
        onRowClick={(row) => navigate(`/admin/clients/${row.id}`)}
      />

      <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} onPageChange={setPage} />
    </motion.div>
  );
}
