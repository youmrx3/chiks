import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FiSearch, FiAlertTriangle, FiXCircle, FiPackage,
  FiPlus, FiMinus, FiDownload, FiSave,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAdmin } from '../../context/AdminContext';
import DataTable from '../../components/admin/DataTable';
import StockBadge from '../../components/admin/StockBadge';
import Pagination from '../../components/admin/Pagination';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import formatCurrency from '../../utils/formatCurrency';
import products from '../../data/products';

const PER_PAGE = 20;

const tabs = [
  { key: 'all', label: "Tout l'inventaire" },
  { key: 'low', label: 'Stock faible', icon: FiAlertTriangle },
  { key: 'out', label: 'En rupture', icon: FiXCircle },
  { key: 'movements', label: 'Suivi des mouvements' },
];

const mockMovements = [
  { date: '2024-11-28', product: 'Combinaison Tricot Ours', size: '3-6m', type: 'Vente', qty: -2, after: 10, responsible: 'Rania', note: 'Commande CMD-042' },
  { date: '2024-11-27', product: 'Gilet Tressé Laine', size: '2-3y', type: 'Ajustement', qty: 5, after: 7, responsible: 'Rania', note: 'Réajustement inventaire' },
  { date: '2024-11-26', product: 'Bonnet & Écharpe Set', size: '0-3m', type: 'Import', qty: 20, after: 35, responsible: 'Fournisseur', note: 'Nouveau lot' },
  { date: '2024-11-25', product: 'Robe Brodée Fille', size: '18-24m', type: 'Retour', qty: 1, after: 8, responsible: 'Client', note: 'Retour client - taille incorrecte' },
  { date: '2024-11-24', product: 'Combinaison Tricot Ours', size: '6-12m', type: 'Vente', qty: -1, after: 0, responsible: 'Rania', note: 'Dernière unité vendue' },
  { date: '2024-11-23', product: 'Pull Col Roulé Rayé', size: '12-18m', type: 'Vente', qty: -1, after: 5, responsible: 'Rania', note: 'Commande CMD-039' },
  { date: '2024-11-22', product: 'Ensemble Coton Bébé', size: '3-6m', type: 'Import', qty: 30, after: 42, responsible: 'Fournisseur', note: 'Réapprovisionnement' },
  { date: '2024-11-21', product: 'Gilet Tressé Laine', size: '3-4y', type: 'Ajustement', qty: -2, after: 6, responsible: 'Rania', note: 'Correction stock' },
];

function flattenInventory(prods) {
  const rows = [];
  prods.forEach((p) => {
    p.sizes.forEach((size) => {
      rows.push({
        id: `${p.id}-${size}`,
        productId: p.id,
        productName: p.name,
        productImage: p.images?.[0],
        sku: p.sku,
        category: p.category,
        ageRange: p.ageRange,
        size,
        stock: p.stockPerSize[size] || 0,
        threshold: 5,
      });
    });
  });
  return rows;
}

export default function Inventory() {
  const { products, updateStock } = useAdmin();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [editStock, setEditStock] = useState({});
  const [showRestock, setShowRestock] = useState(false);
  const [selected, setSelected] = useState([]);

  const invData = useMemo(() => flattenInventory(products), [products]);

  const filtered = useMemo(() => {
    let list = [...invData];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((r) => r.productName.toLowerCase().includes(q) || r.sku?.toLowerCase().includes(q));
    }
    if (activeTab === 'low') list = list.filter((r) => r.stock > 0 && r.stock < 10).sort((a, b) => a.stock - b.stock);
    if (activeTab === 'out') list = list.filter((r) => r.stock === 0);
    if (activeTab === 'movements') return [];
    return list;
  }, [invData, activeTab, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleAdjust = (rowId, delta) => {
    setEditStock((prev) => ({
      ...prev,
      [rowId]: (prev[rowId] || 0) + delta,
    }));
  };

  const handleSaveStock = (row) => {
    const adjustment = editStock[row.id] || 0;
    if (adjustment === 0) return;
    const newQty = Math.max(0, row.stock + adjustment);
    updateStock(row.productId, row.size, newQty);
    toast.success(`${row.productName} (${row.size}) : stock mis à jour`);
    setEditStock((prev) => ({ ...prev, [row.id]: 0 }));
  };

  const totalSKUs = invData.length;
  const lowStockCount = invData.filter((r) => r.stock > 0 && r.stock < 10).length;
  const outOfStockCount = invData.filter((r) => r.stock === 0).length;

  const invColumns = [
    {
      key: 'product', label: 'Produit', render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={row.productImage} alt={row.productName} style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/36'; }}
          />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--c-gray-900)' }}>{row.productName}</div>
            <div style={{ fontSize: '10px', color: 'var(--c-gray-500)', fontFamily: 'monospace' }}>{row.sku}</div>
          </div>
        </div>
      ),
    },
    { key: 'category', label: 'Catégorie', render: (row) => <span style={{ fontSize: '11px', color: 'var(--c-gray-700)' }}>{row.category}</span> },
    { key: 'size', label: 'Taille', render: (row) => <span style={{ fontWeight: 600, fontSize: '12px' }}>{row.size}</span> },
    {
      key: 'stock', label: 'Stock actuel', render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 700, fontSize: '14px', minWidth: '24px' }}>{row.stock}</span>
          <StockBadge qty={row.stock} />
        </div>
      ),
    },
    {
      key: 'threshold', label: 'Seuil d\'alerte', render: (row) => (
        <input
          type="number"
          defaultValue={row.threshold}
          style={{ width: '50px', padding: '4px 6px', border: '1px solid var(--c-gray-100)', borderRadius: '4px', fontSize: '12px', textAlign: 'center' }}
        />
      ),
    },
    {
      key: 'adjust', label: 'Ajuster stock', render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button onClick={() => handleAdjust(row.id, -1)} style={{ padding: '4px', borderRadius: '4px', color: 'var(--c-red)', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-red-pale)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <FiMinus size={14} />
          </button>
          <input
            type="number"
            value={editStock[row.id] || 0}
            onChange={(e) => setEditStock((prev) => ({ ...prev, [row.id]: Number(e.target.value) || 0 }))}
            style={{ width: '50px', padding: '4px 6px', border: '1px solid var(--c-gray-100)', borderRadius: '4px', fontSize: '12px', textAlign: 'center' }}
          />
          <button onClick={() => handleAdjust(row.id, 1)} style={{ padding: '4px', borderRadius: '4px', color: 'var(--c-green)', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-green-pale)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <FiPlus size={14} />
          </button>
          {(editStock[row.id] || 0) !== 0 && (
            <button onClick={() => handleSaveStock(row)} style={{ padding: '4px 8px', borderRadius: '4px', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '11px', fontWeight: 600 }}>
              <FiSave size={12} /> OK
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--c-gray-900)', fontFamily: 'var(--font-display)' }}>
          Inventaire
        </h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', background: 'transparent', color: 'var(--c-gray-700)', fontSize: '13px', fontWeight: 600 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <FiDownload size={16} /> Exporter CSV
          </button>
          <button
            onClick={() => setShowRestock(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '13px', border: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
          >
            Réapprovisionnement
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', padding: '16px 20px', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--c-blue-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-blue)', flexShrink: 0 }}>
            <FiPackage size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', fontWeight: 500, textTransform: 'uppercase' }}>Total SKUs</div>
            <div style={{ fontSize: '22px', fontWeight: 700 }}>{totalSKUs}</div>
          </div>
        </div>
        <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', padding: '16px 20px', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--c-orange-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-orange)', flexShrink: 0 }}>
            <FiAlertTriangle size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', fontWeight: 500, textTransform: 'uppercase' }}>Stock faible</div>
            <div style={{ fontSize: '22px', fontWeight: 700 }}>{lowStockCount}</div>
          </div>
        </div>
        <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', padding: '16px 20px', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--c-red-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-red)', flexShrink: 0 }}>
            <FiXCircle size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', fontWeight: 500, textTransform: 'uppercase' }}>Rupture</div>
            <div style={{ fontSize: '22px', fontWeight: 700 }}>{outOfStockCount}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setPage(1); }}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '12px',
              fontWeight: 600,
              background: activeTab === tab.key ? 'var(--c-yellow)' : 'var(--c-white)',
              color: activeTab === tab.key ? 'var(--c-gray-900)' : 'var(--c-gray-700)',
              border: activeTab === tab.key ? 'none' : '1px solid var(--c-gray-100)',
              boxShadow: activeTab === tab.key ? 'none' : 'var(--shadow-card)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.key) { e.currentTarget.style.background = 'var(--c-gray-50)'; }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.key) { e.currentTarget.style.background = 'var(--c-white)'; }
            }}
          >
            {tab.icon && <tab.icon size={14} />}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab !== 'movements' ? (
        <>
          <div style={{ position: 'relative', marginBottom: '16px', maxWidth: '320px' }}>
            <FiSearch size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-gray-500)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{ width: '100%', padding: '9px 12px 9px 34px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--c-yellow)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
            />
          </div>

          <DataTable
            columns={invColumns}
            data={paged}
            selectable
          />
          <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} onPageChange={setPage} />
        </>
      ) : (
        <div style={{ background: 'var(--c-white)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--c-gray-100)' }}>
                  {['Date', 'Produit', 'Taille', 'Type', 'Variation', 'Stock après', 'Responsable', 'Note'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--c-gray-500)', textTransform: 'uppercase', letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockMovements.map((m, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--c-gray-50)' }}>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: 'var(--c-gray-700)' }}>{m.date}</td>
                    <td style={{ padding: '10px 16px', fontSize: '12px', fontWeight: 600 }}>{m.product}</td>
                    <td style={{ padding: '10px 16px', fontSize: '12px' }}>{m.size}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 'var(--radius-pill)', fontSize: '11px', fontWeight: 600, background: m.type === 'Vente' ? 'var(--c-red-pale)' : m.type === 'Retour' ? 'var(--c-orange-pale)' : m.type === 'Import' ? 'var(--c-green-pale)' : 'var(--c-blue-pale)', color: m.type === 'Vente' ? 'var(--c-red-deep)' : m.type === 'Retour' ? 'var(--c-orange-deep)' : m.type === 'Import' ? 'var(--c-green-deep)' : 'var(--c-blue-deep)' }}>
                        {m.type}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: '13px', fontWeight: 700, color: m.qty > 0 ? 'var(--c-green)' : 'var(--c-red)' }}>
                      {m.qty > 0 ? `+${m.qty}` : m.qty}
                    </td>
                    <td style={{ padding: '10px 16px', fontSize: '12px' }}>{m.after}</td>
                    <td style={{ padding: '10px 16px', fontSize: '12px', color: 'var(--c-gray-700)' }}>{m.responsible}</td>
                    <td style={{ padding: '10px 16px', fontSize: '11px', color: 'var(--c-gray-500)', fontStyle: 'italic' }}>{m.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={showRestock}
        title="Réapprovisionnement"
        message="Sélectionnez les produits et les quantités à réapprovisionner."
        confirmLabel="Confirmer"
        variant="info"
        onConfirm={() => { toast.success('Réapprovisionnement effectué'); setShowRestock(false); }}
        onCancel={() => setShowRestock(false)}
      />
    </motion.div>
  );
}
