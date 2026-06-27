import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiTrendingUp, FiShoppingCart, FiUsers, FiAlertTriangle,
  FiEye, FiEdit2, FiDollarSign, FiRefreshCw, FiClock, FiSmile,
  FiChevronRight,
} from 'react-icons/fi';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend,
} from 'recharts';
import StatCard from '../../components/admin/StatCard';
import ChartCard from '../../components/admin/ChartCard';
import DataTable from '../../components/admin/DataTable';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import formatCurrency from '../../utils/formatCurrency';
import { formatDateShort } from '../../utils/formatDate';
import stats from '../../data/stats';
import orders from '../../data/orders';

const dateTabs = ['Aujourd\'hui', '7 jours', 'Ce mois', 'Ce trimestre', 'Cette année', 'Personnalisé'];

const revenueTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', boxShadow: 'var(--shadow-card)', fontSize: '12px' }}>
        <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--c-gray-900)' }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <span>{p.name} :</span>
            <span style={{ fontWeight: 600 }}>{p.name === 'Revenu' ? formatCurrency(p.value) : p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const statusPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div style={{ background: '#fff', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', boxShadow: 'var(--shadow-card)', fontSize: '12px' }}>
        <div style={{ fontWeight: 700, marginBottom: '2px' }}>{d.status}</div>
        <div>{d.count} commandes</div>
      </div>
    );
  }
  return null;
};

const categoryTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', boxShadow: 'var(--shadow-card)', fontSize: '12px' }}>
        <div style={{ fontWeight: 700, marginBottom: '2px' }}>{label}</div>
        <div style={{ color: 'var(--c-mint)' }}>Revenu: {formatCurrency(payload[0].value)}</div>
      </div>
    );
  }
  return null;
};

const recentOrders = orders.slice(0, 8);

const orderColumns = [
  { key: 'id', label: 'N°', render: (row) => <span style={{ color: 'var(--c-blue)', fontWeight: 600, fontFamily: 'monospace' }}>{row.id}</span> },
  { key: 'customer', label: 'Client', render: (row) => <span style={{ fontWeight: 500 }}>{row.customer.name}</span> },
  { key: 'createdAt', label: 'Date', render: (row) => <span style={{ color: 'var(--c-gray-500)', fontSize: '12px' }}>{formatDateShort(row.createdAt)}</span> },
  { key: 'items', label: 'Articles', render: (row) => <span>{row.items.length} art.</span> },
  { key: 'total', label: 'Total', render: (row) => <span style={{ fontWeight: 700 }}>{formatCurrency(row.total)}</span> },
  { key: 'status', label: 'Statut', render: (row) => <OrderStatusBadge status={row.status} /> },
  { key: 'actions', label: 'Actions', render: () => (
    <div style={{ display: 'flex', gap: '6px' }}>
      <button style={{ padding: '4px', color: 'var(--c-gray-500)', borderRadius: '4px', display: 'flex' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-blue-pale)'; e.currentTarget.style.color = 'var(--c-blue)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
      >
        <FiEye size={15} />
      </button>
      <button style={{ padding: '4px', color: 'var(--c-gray-500)', borderRadius: '4px', display: 'flex' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-pale)'; e.currentTarget.style.color = 'var(--c-yellow-deep)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
      >
        <FiEdit2 size={15} />
      </button>
    </div>
  )},
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [activeDateTab, setActiveDateTab] = useState('Ce mois');
  const [revenueChartType, setRevenueChartType] = useState('bar');
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const Skeleton = ({ height, width, mb }) => (
    <div className="skeleton" style={{ height: height || '20px', width: width || '100%', marginBottom: mb || '0', borderRadius: 'var(--radius-sm)' }} />
  );

  if (loading) {
    return (
      <div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {dateTabs.map((t) => <Skeleton key={t} height="32px" width="110px" />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} height="100px" />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '60fr 40fr', gap: '16px', marginBottom: '24px' }}>
          <Skeleton height="320px" />
          <Skeleton height="320px" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <Skeleton height="280px" />
          <Skeleton height="280px" />
        </div>
      </div>
    );
  }

  const totalOrders = stats.ordersByStatus.reduce((a, b) => a + b.count, 0);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
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
                if (activeDateTab !== tab) {
                  e.currentTarget.style.background = 'var(--c-gray-50)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeDateTab !== tab) {
                  e.currentTarget.style.background = 'var(--c-white)';
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
          <StatCard
            icon={FiTrendingUp}
            label="Chiffre d'affaires"
            value={formatCurrency(stats.overview.revenueThisMonth)}
            change={`+${stats.overview.revenueGrowth}%`}
            changeType="up"
            borderColor="var(--c-yellow)"
          />
          <StatCard
            icon={FiShoppingCart}
            label="Commandes aujourd'hui"
            value={stats.overview.ordersToday}
            change={`+${stats.overview.ordersTodayVsYesterday} vs hier`}
            changeType="up"
            borderColor="var(--c-mint)"
          />
          <StatCard
            icon={FiUsers}
            label="Nouveaux clients"
            value={stats.overview.newCustomersThisMonth}
            change={`+${stats.overview.newCustomersGrowth}%`}
            changeType="up"
            borderColor="var(--c-blue)"
          />
          <StatCard
            icon={FiAlertTriangle}
            label="Alertes stock"
            value={`${stats.overview.lowStockItems} articles`}
            change={`${stats.overview.outOfStockItems} en rupture`}
            changeType="down"
            borderColor="var(--c-red)"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <StatCard
            icon={FiDollarSign}
            label="Panier moyen"
            value={formatCurrency(stats.overview.avgOrderValue)}
            changeType="neutral"
            borderColor="var(--c-gray-300)"
          />
          <StatCard
            icon={FiRefreshCw}
            label="Taux de retour"
            value={`${stats.overview.returnRate}%`}
            changeType="neutral"
            borderColor="var(--c-gray-300)"
          />
          <StatCard
            icon={FiClock}
            label="Commandes en attente"
            value={stats.overview.pendingOrders}
            changeType="neutral"
            borderColor="var(--c-orange)"
          />
          <StatCard
            icon={FiSmile}
            label="Satisfaction"
            value="4.7/5"
            subtitle="Basé sur 312 avis"
            changeType="neutral"
            borderColor="var(--c-gray-300)"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '60fr 40fr', gap: '16px', marginBottom: '24px' }}>
          <ChartCard
            title="Chiffre d'affaires mensuel"
            controls={
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => setRevenueChartType('bar')}
                  style={{
                    padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: 600,
                    background: revenueChartType === 'bar' ? 'var(--c-yellow)' : 'var(--c-gray-50)',
                    color: revenueChartType === 'bar' ? 'var(--c-gray-900)' : 'var(--c-gray-700)',
                    transition: 'all 0.15s',
                  }}
                >
                  Barres
                </button>
                <button
                  onClick={() => setRevenueChartType('line')}
                  style={{
                    padding: '4px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', fontWeight: 600,
                    background: revenueChartType === 'line' ? 'var(--c-yellow)' : 'var(--c-gray-50)',
                    color: revenueChartType === 'line' ? 'var(--c-gray-900)' : 'var(--c-gray-700)',
                    transition: 'all 0.15s',
                  }}
                >
                  Ligne
                </button>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={280}>
              {revenueChartType === 'bar' ? (
                <BarChart data={stats.revenueByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--c-gray-50)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--c-gray-500)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--c-gray-500)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={revenueTooltip} />
                  <Bar dataKey="revenue" name="Revenu" fill="var(--c-yellow)" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={stats.revenueByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--c-gray-50)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--c-gray-500)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--c-gray-500)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={revenueTooltip} />
                  <Line type="monotone" dataKey="revenue" name="Revenu" stroke="var(--c-yellow)" strokeWidth={2.5} dot={{ fill: 'var(--c-yellow)', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Commandes par statut">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={stats.ordersByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  dataKey="count"
                  nameKey="status"
                  paddingAngle={2}
                >
                  {stats.ordersByStatus.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={statusPieTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', marginTop: '-40px', position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--c-gray-900)' }}>{totalOrders}</div>
              <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', fontWeight: 500 }}>commandes</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
              {stats.ordersByStatus.map((s) => (
                <div key={s.status} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }} />
                  <span style={{ color: 'var(--c-gray-700)' }}>{s.status}</span>
                  <span style={{ fontWeight: 700, color: 'var(--c-gray-900)' }}>{s.count}</span>
                  <span style={{ color: 'var(--c-gray-500)' }}>({Math.round((s.count / totalOrders) * 100)}%)</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <ChartCard title="Revenus par catégorie">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stats.revenueByCategory} layout="vertical" margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--c-gray-50)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--c-gray-500)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: 'var(--c-gray-700)' }} axisLine={false} tickLine={false} width={110} />
                <Tooltip content={categoryTooltip} />
                <Bar dataKey="revenue" fill="var(--c-mint)" radius={[0, 6, 6, 0]} barSize={18} label={{ position: 'right', fontSize: 10, fill: 'var(--c-gray-500)', formatter: (v) => `${(v / 1000).toFixed(0)}k` }} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Modes de paiement">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Paiement à la livraison', value: 68, color: 'var(--c-yellow)' },
                    { name: 'CIB', value: 22, color: 'var(--c-mint)' },
                    { name: 'Edahabia', value: 10, color: 'var(--c-blue)' },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius="90%"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {stats.paymentMethods.map((entry, i) => (
                    <Cell key={i} fill={entry.method === 'Paiement à la livraison' ? 'var(--c-yellow)' : entry.method === 'CIB' ? 'var(--c-mint)' : 'var(--c-blue)'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
              {stats.paymentMethods.map((pm) => (
                <div key={pm.method} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: pm.method === 'Paiement à la livraison' ? 'var(--c-yellow)' : pm.method === 'CIB' ? 'var(--c-mint)' : 'var(--c-blue)' }} />
                  <span style={{ color: 'var(--c-gray-700)' }}>{pm.method}</span>
                  <span style={{ fontWeight: 700 }}>{pm.percent}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '65fr 35fr', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div
              style={{
                background: 'var(--c-white)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-card)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px 0',
                }}
              >
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--c-gray-900)', margin: 0 }}>
                  Commandes récentes
                </h3>
              </div>
              <DataTable columns={orderColumns} data={recentOrders} />
              <div style={{ padding: '12px 20px', borderTop: '1px solid var(--c-gray-50)' }}>
                <button
                  onClick={() => navigate('/admin/commandes')}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--c-yellow-deep)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.gap = '8px'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.gap = '4px'; }}
                >
                  Voir toutes les commandes <FiChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'var(--c-white)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-card)',
              padding: '20px 24px',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--c-gray-900)', marginBottom: '16px' }}>
              Top produits
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {stats.topProducts.map((p, i) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: i === 0 ? 'var(--c-yellow)' : 'var(--c-gray-50)',
                      color: i === 0 ? 'var(--c-gray-900)' : 'var(--c-gray-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    #{i + 1}
                  </div>
                  <img
                    src={"https://t4.ftcdn.net/jpg/06/29/41/61/360_F_629416158_owvmTg2Kp6GVw7NZQ1swCKkLUaSsVPqW.jpg"}
                    alt={p.name}
                    style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', marginTop: '1px' }}>
                      {p.sales} ventes · {formatCurrency(p.revenue)}
                    </div>
                    <div
                      style={{
                        marginTop: '6px',
                        height: '6px',
                        background: 'var(--c-gray-50)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${Math.round((p.sales / stats.topProducts[0].sales) * 100)}%`,
                          background: 'var(--c-yellow)',
                          borderRadius: '3px',
                          transition: 'width 0.6s',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <ChartCard title="Revenus par wilaya">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.revenueByWilaya} layout="vertical" margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--c-gray-50)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--c-gray-500)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="wilaya" tick={{ fontSize: 11, fill: 'var(--c-gray-700)' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip content={categoryTooltip} />
                <Bar dataKey="revenue" fill="var(--c-yellow)" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div
            style={{
              background: 'var(--c-white)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-card)',
              padding: '20px 24px',
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--c-gray-900)', marginBottom: '16px' }}>
              Activité récente
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {stats.recentActivity.map((act, i) => {
                const dotColor =
                  act.type === 'commande' ? 'var(--c-blue)' :
                  act.type === 'stock' ? 'var(--c-orange)' :
                  act.type === 'client' ? 'var(--c-green)' :
                  'var(--c-red)';
                return (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: i < stats.recentActivity.length - 1 ? '1px solid var(--c-gray-50)' : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '12px', flexShrink: 0 }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: dotColor, marginTop: '3px' }} />
                      {i < stats.recentActivity.length - 1 && (
                        <div style={{ width: '1px', flex: 1, background: 'var(--c-gray-100)', minHeight: '16px' }} />
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--c-gray-900)', lineHeight: 1.4 }}>{act.text}</div>
                      <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', marginTop: '2px' }}>{act.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
