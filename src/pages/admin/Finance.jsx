import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiTrendingUp, FiDollarSign, FiShoppingCart, FiRefreshCw,
  FiArrowUpRight, FiDownload, FiEye,
} from 'react-icons/fi';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import ChartCard from '../../components/admin/ChartCard';
import formatCurrency from '../../utils/formatCurrency';
import { formatDateShort } from '../../utils/formatDate';
import stats from '../../data/stats';
import orders from '../../data/orders';

const dateTabs = ['Aujourd\'hui', '7 jours', 'Ce mois', 'Ce trimestre', 'Cette année', 'Personnalisé'];

const dailyTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', boxShadow: 'var(--shadow-card)', fontSize: '12px' }}>
        <div style={{ fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '4px' }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <span>{p.name} :</span>
            <span style={{ fontWeight: 600 }}>{p.name === 'Revenu' ? formatCurrency(p.value) : p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const categoryData = [
  { name: 'Knitwear', revenue: 284000, percent: 34 },
  { name: 'Manteaux', revenue: 156000, percent: 19 },
  { name: 'Nouveaux-nés', revenue: 124000, percent: 15 },
  { name: 'Tout-petits', revenue: 102000, percent: 12 },
  { name: 'Accessoires', revenue: 86000, percent: 10 },
  { name: 'Enfants', revenue: 78000, percent: 9 },
];

const transactions = [
  { id: 'CMD-2024-042', client: 'Youssef Benali', date: '2024-11-30', items: 2, total: 5400, payment: 'cash_on_delivery', status: 'paid' },
  { id: 'CMD-2024-041', client: 'Rachid Boudiaf', date: '2024-11-29', items: 3, total: 8900, payment: 'cib', status: 'paid' },
  { id: 'CMD-2024-040', client: 'Karim Zeddam', date: '2024-11-28', items: 1, total: 3200, payment: 'edahabia', status: 'paid' },
  { id: 'CMD-2024-039', client: 'Ines Zaidi', date: '2024-11-27', items: 2, total: 7600, payment: 'cash_on_delivery', status: 'paid' },
  { id: 'CMD-2024-038', client: 'Lamia Bouchareb', date: '2024-11-26', items: 1, total: 3100, payment: 'cash_on_delivery', status: 'unpaid' },
  { id: 'CMD-2024-037', client: 'Samira Haddad', date: '2024-11-25', items: 2, total: 6300, payment: 'cash_on_delivery', status: 'paid' },
  { id: 'CMD-2024-036', client: 'Mehdi Toumi', date: '2024-11-24', items: 1, total: 3900, payment: 'cash_on_delivery', status: 'paid' },
  { id: 'CMD-2024-035', client: 'Assia Merabet', date: '2024-11-23', items: 4, total: 10400, payment: 'cib', status: 'paid' },
];

export default function Finance() {
  const [activeDateTab, setActiveDateTab] = useState('Ce mois');

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

  const totalPaid = orders.filter((o) => o.paymentStatus === 'paid').reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const avgOrder = orders.reduce((s, o) => s + o.total, 0) / orders.length;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--c-gray-900)', fontFamily: 'var(--font-display)' }}>
          Finances
        </h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select style={{ padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)', minWidth: '160px' }}>
            <option>Rapport mensuel</option>
            <option>Rapport trimestriel</option>
            <option>Rapport annuel</option>
          </select>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', background: 'transparent', color: 'var(--c-gray-700)', fontSize: '13px', fontWeight: 600, transition: 'all 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <FiDownload size={16} /> Exporter
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {dateTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveDateTab(tab)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '12px',
              fontWeight: 600,
              background: activeDateTab === tab ? 'var(--c-yellow)' : 'var(--c-white)',
              color: activeDateTab === tab ? 'var(--c-gray-900)' : 'var(--c-gray-700)',
              border: activeDateTab === tab ? 'none' : '1px solid var(--c-gray-100)',
              boxShadow: activeDateTab === tab ? 'none' : 'var(--shadow-card)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              if (activeDateTab !== tab) { e.currentTarget.style.background = 'var(--c-gray-50)'; }
            }}
            onMouseLeave={(e) => {
              if (activeDateTab !== tab) { e.currentTarget.style.background = 'var(--c-white)'; }
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { icon: FiTrendingUp, label: "Chiffre d'affaires", value: formatCurrency(stats.overview.revenueThisMonth), color: 'var(--c-yellow)' },
          { icon: FiShoppingCart, label: 'Commandes payées', value: orders.filter((o) => o.paymentStatus === 'paid').length, color: 'var(--c-mint)' },
          { icon: FiDollarSign, label: 'Panier moyen', value: formatCurrency(Math.round(avgOrder)), color: 'var(--c-blue)' },
          { icon: FiRefreshCw, label: 'Remboursements', value: formatCurrency(0), color: 'var(--c-orange)' },
          { icon: FiArrowUpRight, label: 'Bénéfice net', value: formatCurrency(Math.round(stats.overview.revenueThisMonth * 0.42)), color: 'var(--c-green)' },
        ].map((card) => (
          <div key={card.label} style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', padding: '16px 20px', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${card.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, flexShrink: 0 }}>
              <card.icon size={17} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{card.label}</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--c-gray-900)', lineHeight: 1.2, marginTop: '2px' }}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      <ChartCard title="Évolution du CA (30 jours)">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={stats.dailyRevenueLast30} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--c-yellow)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--c-yellow)" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--c-gray-50)" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--c-gray-500)' }} axisLine={false} tickLine={false} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--c-gray-500)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={dailyTooltip} />
            <Area type="monotone" dataKey="revenue" name="Revenu" stroke="var(--c-yellow)" strokeWidth={2.5} fill="url(#revenueGradient)" dot={{ fill: 'var(--c-yellow)', r: 3 }} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '16px', marginBottom: '24px' }}>
        <ChartCard title="Revenus par catégorie">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData} layout="vertical" margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--c-gray-50)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--c-gray-500)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--c-gray-700)' }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                <div style={{ background: '#fff', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', fontSize: '12px' }}>
                  <div style={{ fontWeight: 700 }}>{label}</div>
                  <div>{formatCurrency(payload[0].value)}</div>
                </div>
              ) : null} />
              <Bar dataKey="revenue" fill="var(--c-yellow)" radius={[0, 6, 6, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Modes de paiement">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Paiement à la livraison', value: totalPaid * 0.68, percent: 68 },
                  { name: 'CIB', value: totalPaid * 0.22, percent: 22 },
                  { name: 'Edahabia', value: totalPaid * 0.10, percent: 10 },
                ]}
                cx="50%" cy="50%" outerRadius={90} dataKey="value" nameKey="name"
              >
                <Cell fill="var(--c-yellow)" />
                <Cell fill="var(--c-mint)" />
                <Cell fill="var(--c-blue)" />
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--c-yellow)' }} />
              <span>Paiement livraison <strong>68%</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--c-mint)' }} />
              <span>CIB <strong>22%</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--c-blue)' }} />
              <span>Edahabia <strong>10%</strong></span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Revenus par wilaya">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stats.revenueByWilaya.slice(0, 8)} layout="vertical" margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--c-gray-50)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--c-gray-500)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="wilaya" tick={{ fontSize: 10, fill: 'var(--c-gray-700)' }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                <div style={{ background: '#fff', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', fontSize: '12px' }}>
                  <div style={{ fontWeight: 700 }}>{label}</div>
                  <div>{formatCurrency(payload[0].value)}</div>
                </div>
              ) : null} />
              <Bar dataKey="revenue" fill="var(--c-mint)" radius={[0, 6, 6, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--c-gray-50)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--c-gray-900)', margin: 0 }}>
            Transactions récentes
          </h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--c-gray-100)' }}>
                {['N°', 'Client', 'Date', 'Articles', 'Total', 'Paiement', 'Statut', 'Actions'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--c-gray-50)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-pale)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--c-blue)', fontFamily: 'monospace' }}>{t.id}</td>
                  <td style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 500 }}>{t.client}</td>
                  <td style={{ padding: '10px 16px', fontSize: '11px', color: 'var(--c-gray-500)' }}>{formatDateShort(t.date)}</td>
                  <td style={{ padding: '10px 16px', fontSize: '12px' }}>{t.items} art.</td>
                  <td style={{ padding: '10px 16px', fontSize: '13px', fontWeight: 700 }}>{formatCurrency(t.total)}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 'var(--radius-pill)', fontSize: '10px', fontWeight: 600, background: paymentColors[t.payment]?.bg || 'var(--c-gray-50)', color: paymentColors[t.payment]?.color || 'var(--c-gray-700)' }}>
                      {paymentLabels[t.payment] || t.payment}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', padding: '2px 8px', borderRadius: 'var(--radius-pill)', fontSize: '10px', fontWeight: 600, background: t.status === 'paid' ? 'var(--c-green-pale)' : 'var(--c-orange-pale)', color: t.status === 'paid' ? 'var(--c-green-deep)' : 'var(--c-orange-deep)' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: t.status === 'paid' ? 'var(--c-green)' : 'var(--c-orange)' }} />
                      {t.status === 'paid' ? 'Payé' : 'Impayé'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <button style={{ padding: '4px', borderRadius: '4px', color: 'var(--c-gray-500)', display: 'flex' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-blue-pale)'; e.currentTarget.style.color = 'var(--c-blue)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
                    >
                      <FiEye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
