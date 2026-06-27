import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPlus, FiEdit2, FiCopy, FiTrash2, FiSearch,
  FiDownload, FiCheckSquare,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAdmin } from '../../context/AdminContext';
import DataTable from '../../components/admin/DataTable';
import StockBadge from '../../components/admin/StockBadge';
import Pagination from '../../components/admin/Pagination';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import formatCurrency from '../../utils/formatCurrency';
import StarRating from '../../components/client/StarRating';

const PER_PAGE = 15;

export default function Products() {
  const { products, deleteProduct } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sort, setSort] = useState('name-asc');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    }
    if (category) list = list.filter((p) => p.category === category);
    if (statusFilter === 'actif') list = list.filter((p) => p.isActive);
    if (statusFilter === 'brouillon') list = list.filter((p) => !p.isActive);
    const [key, dir] = sort.split('-');
    list.sort((a, b) => {
      let va, vb;
      if (key === 'name') { va = a.name; vb = b.name; }
      else if (key === 'price') { va = a.salePrice || a.price; vb = b.salePrice || b.price; }
      else if (key === 'stock') {
        va = Object.values(a.stockPerSize).reduce((s, v) => s + v, 0);
        vb = Object.values(b.stockPerSize).reduce((s, v) => s + v, 0);
      }
      else if (key === 'rating') { va = a.rating; vb = b.rating; }
      else { va = a.createdAt; vb = b.createdAt; }
      if (typeof va === 'string') return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      return dir === 'asc' ? va - vb : vb - va;
    });
    return list;
  }, [products, search, category, statusFilter, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalStock = (p) => Object.values(p.stockPerSize).reduce((a, b) => a + b, 0);

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteProduct(deleteTarget.id);
    toast.success(`"${deleteTarget.name}" supprimé`);
    setDeleteTarget(null);
    setSelected([]);
  };

  const handleDuplicate = (product) => {
    toast.success(`"${product.name}" dupliqué`);
  };

  const columns = [
    {
      key: 'image', label: '', render: (row) => (
        <img src={row.images?.[0]} alt={row.name} style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/52'; }}
        />
      ),
    },
    {
      key: 'name', label: 'Produit', render: (row) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--c-gray-900)' }}>{row.name}</div>
          <div style={{ fontSize: '11px', color: 'var(--c-gray-500)', fontFamily: 'monospace' }}>{row.sku || row.id}</div>
        </div>
      ),
    },
    {
      key: 'category', label: 'Catégorie', render: (row) => (
        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', fontSize: '11px', fontWeight: 600 }}>{row.category}</span>
      ),
    },
    {
      key: 'ageRange', label: 'Âge', render: (row) => (
        <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-gray-50)', color: 'var(--c-gray-700)', fontSize: '11px', fontWeight: 500 }}>{row.ageRange}</span>
      ),
    },
    {
      key: 'price', label: 'Prix', render: (row) => (
        <div>
          <span style={{ fontWeight: 700, color: row.salePrice ? 'var(--c-yellow-deep)' : 'var(--c-gray-900)', fontSize: '13px' }}>
            {formatCurrency(row.salePrice || row.price)}
          </span>
          {row.salePrice && (
            <span style={{ fontSize: '11px', color: 'var(--c-gray-500)', textDecoration: 'line-through', marginLeft: '4px' }}>
              {formatCurrency(row.price)}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'stock', label: 'Stock', render: (row) => (
        <div>
          <StockBadge qty={totalStock(row)} />
          <div style={{ fontSize: '10px', color: 'var(--c-gray-500)', marginTop: '2px' }}>
            {row.sizes.map((s) => `${s}: ${row.stockPerSize[s] || 0}`).join(', ')}
          </div>
        </div>
      ),
    },
    {
      key: 'rating', label: 'Note', render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <StarRating rating={row.rating} size={12} />
          <span style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>({row.reviewCount})</span>
        </div>
      ),
    },
    {
      key: 'isActive', label: 'Statut', render: (row) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: row.isActive ? 'var(--c-green-pale)' : 'var(--c-gray-50)', color: row.isActive ? 'var(--c-green-deep)' : 'var(--c-gray-500)', fontSize: '11px', fontWeight: 600 }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: row.isActive ? 'var(--c-green)' : 'var(--c-gray-300)' }} />
          {row.isActive ? 'Actif' : 'Brouillon'}
        </span>
      ),
    },
    {
      key: 'actions', label: 'Actions', render: (row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/produits/${row.id}`); }} style={{ padding: '5px', color: 'var(--c-gray-500)', borderRadius: '4px', display: 'flex' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-blue-pale)'; e.currentTarget.style.color = 'var(--c-blue)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
          >
            <FiEdit2 size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleDuplicate(row); }} style={{ padding: '5px', color: 'var(--c-gray-500)', borderRadius: '4px', display: 'flex' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-mint-pale)'; e.currentTarget.style.color = 'var(--c-mint-deep)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
          >
            <FiCopy size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(row); }} style={{ padding: '5px', color: 'var(--c-gray-500)', borderRadius: '4px', display: 'flex' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-red-pale)'; e.currentTarget.style.color = 'var(--c-red)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--c-gray-900)', fontFamily: 'var(--font-display)' }}>
            Produits
          </h1>
          <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', fontSize: '12px', fontWeight: 600 }}>
            {products.length} produits
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', background: 'transparent', color: 'var(--c-gray-700)', fontSize: '13px', fontWeight: 600, transition: 'all 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <FiDownload size={16} /> Exporter CSV
          </button>
          <button
            onClick={() => navigate('/admin/produits/nouveau')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontSize: '13px', fontWeight: 700, border: 'none', transition: 'all 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
          >
            <FiPlus size={16} /> Ajouter un produit
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px', maxWidth: '320px' }}>
          <FiSearch size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-gray-500)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ width: '100%', padding: '9px 12px 9px 34px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)', transition: 'border-color 0.15s' }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--c-yellow)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
          />
        </div>
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          style={{ padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)', minWidth: '130px' }}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          style={{ padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)', minWidth: '120px' }}
        >
          <option value="">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="brouillon">Brouillon</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          style={{ padding: '9px 12px', border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--c-gray-900)', background: 'var(--c-white)', minWidth: '140px' }}
        >
          <option value="name-asc">Nom A-Z</option>
          <option value="name-desc">Nom Z-A</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="stock-asc">Stock croissant</option>
          <option value="stock-desc">Stock décroissant</option>
          <option value="rating-desc">Meilleure note</option>
          <option value="created-desc">Plus récent</option>
        </select>
      </div>

      {selected.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', background: 'var(--c-yellow-pale)', borderRadius: 'var(--radius-sm)', marginBottom: '12px', fontSize: '13px' }}>
          <FiCheckSquare size={16} style={{ color: 'var(--c-yellow-deep)' }} />
          <span style={{ fontWeight: 600, flex: 1 }}>{selected.length} produit(s) sélectionné(s)</span>
          <button style={{ padding: '6px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--c-white)', color: 'var(--c-green-deep)', fontSize: '12px', fontWeight: 600, border: '1px solid var(--c-green-pale)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-green-pale)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-white)'; }}
          >
            Activer
          </button>
          <button style={{ padding: '6px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--c-white)', color: 'var(--c-gray-700)', fontSize: '12px', fontWeight: 600, border: '1px solid var(--c-gray-100)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-white)'; }}
          >
            Désactiver
          </button>
          <button style={{ padding: '6px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--c-white)', color: 'var(--c-red)', fontSize: '12px', fontWeight: 600, border: '1px solid var(--c-red-pale)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-red-pale)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-white)'; }}
          >
            Supprimer
          </button>
        </div>
      )}

      <DataTable
        columns={columns}
        data={paged}
        selectable
        onRowClick={(row) => navigate(`/admin/produits/${row.id}`)}
      />

      <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} onPageChange={setPage} />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Supprimer le produit"
        message={`Êtes-vous sûr de vouloir supprimer "${deleteTarget?.name}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </motion.div>
  );
}
