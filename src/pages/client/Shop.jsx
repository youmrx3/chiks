import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiSliders, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import products from '../../data/products';
import ProductGrid from '../../components/client/ProductGrid';
import FilterSidebar from '../../components/client/FilterSidebar';
import BreadCrumb from '../../components/client/BreadCrumb';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Nouveautés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Les mieux notés' },
  { value: 'bestseller', label: 'Meilleures ventes' },
];

const ITEMS_PER_PAGE = 12;

export default function Shop() {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filters = {
    categories: searchParams.get('categories')?.split(',').filter(Boolean) || [],
    ages: searchParams.get('ages')?.split(',').filter(Boolean) || [],
    genders: searchParams.get('genders')?.split(',').filter(Boolean) || [],
    priceMin: parseInt(searchParams.get('priceMin')) || 0,
    priceMax: parseInt(searchParams.get('priceMax')) || 10000,
    colors: searchParams.get('colors')?.split(',').filter(Boolean) || [],
    sizes: searchParams.get('sizes')?.split(',').filter(Boolean) || [],
    inStock: searchParams.get('inStock') === 'true',
    minRating: parseInt(searchParams.get('minRating')) || 0,
  };

  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page')) || 1;

  const updateSearchParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === '' || value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.set(key, value.join(','));
    } else {
      params.set(key, value);
    }
    if (key !== 'page') params.set('page', '1');
    setSearchParams(params);
  };

  const handleFilterChange = (newFilters) => {
    Object.entries(newFilters).forEach(([key, value]) => {
      const paramKey = key === 'priceMin' ? 'priceMin' : key === 'priceMax' ? 'priceMax' : key === 'inStock' ? 'inStock' : key === 'minRating' ? 'minRating' : key;
      if (Array.isArray(value)) {
        updateSearchParam(paramKey, value);
      } else if (typeof value === 'boolean') {
        updateSearchParam(paramKey, value ? 'true' : '');
      } else {
        updateSearchParam(paramKey, value);
      }
    });
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams();
    if (sort) params.set('sort', sort);
    setSearchParams(params);
  };

  const handleSortChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', e.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products].filter((p) => p.isActive);

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.ages.length > 0) {
      result = result.filter((p) => filters.ages.some((a) => p.ageRange === a || p.sizes.includes(a)));
    }
    if (filters.genders.length > 0) {
      result = result.filter((p) => filters.genders.includes(p.gender));
    }
    result = result.filter((p) => {
      const productPrice = p.salePrice || p.price;
      return productPrice >= filters.priceMin && productPrice <= filters.priceMax;
    });
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name))
      );
    }
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s))
      );
    }
    if (filters.inStock) {
      result = result.filter((p) =>
        Object.values(p.stockPerSize).some((qty) => qty > 0)
      );
    }
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestseller':
        result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [filters, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(page, totalPages || 1);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddToCart = (product, size, color, qty) => {
    addItem(product, size, color, qty);
    toast.success(`${product.name} ajouté au panier !`);
  };

  const handleToggleWishlist = (id) => {
    toggle(id);
  };

  const activeFilterCount = [
    filters.categories,
    filters.ages,
    filters.genders,
    filters.colors,
    filters.sizes,
  ].reduce((sum, arr) => sum + arr.length, 0) + (filters.inStock ? 1 : 0) + (filters.minRating > 0 ? 1 : 0) +
    ((filters.priceMin > 0 || filters.priceMax < 10000) ? 1 : 0);

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 32px 64px' }}>
      <BreadCrumb items={[{ label: 'Accueil', link: '/' }, { label: 'Boutique' }]} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16, marginBottom: 24, flexWrap: 'wrap', gap: 12 }}
        className="shop-header"
      >
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--c-gray-900)' }}>
            Boutique
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)', marginTop: 4 }}>
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setMobileFilterOpen(true)}
            style={{ display: 'none', alignItems: 'center', gap: 8, height: 42, padding: '0 20px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-700)', transition: 'border-color 0.2s' }}
            className="mobile-filter-btn"
          >
            <style>{`@media (max-width: 768px) { .mobile-filter-btn { display: flex !important; } }`}</style>
            <FiSliders size={16} />
            Filtres
            {activeFilterCount > 0 && (
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--c-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'var(--c-gray-900)' }}>{activeFilterCount}</span>
            )}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FiGrid size={16} style={{ color: 'var(--c-gray-500)' }} />
            <select
              value={sort}
              onChange={handleSortChange}
              style={{
                height: 42, padding: '0 36px 0 16px', borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)', fontWeight: 500,
                color: 'var(--c-gray-900)', background: 'var(--c-white)', cursor: 'pointer',
                appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239B9A96\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px',
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32 }} className="shop-layout">
        <style>{`@media (max-width: 768px) { .shop-layout { flex-direction: column; } }`}</style>

        <aside style={{ width: 280, flexShrink: 0 }}
          className="shop-sidebar"
        >
          <style>{`@media (max-width: 768px) { .shop-sidebar { display: none; } }`}</style>
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          {paginatedProducts.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', textAlign: 'center' }}>
              <svg width="80" height="80" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 16, opacity: 0.3 }}>
                <circle cx="16" cy="16" r="10" stroke="var(--c-gray-300)" strokeWidth="2" />
                <line x1="16" y1="12" x2="16" y2="18" stroke="var(--c-gray-300)" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="15" x2="20" y2="15" stroke="var(--c-gray-300)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--c-gray-900)', marginBottom: 8 }}>Aucun produit trouvé</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)', marginBottom: 24, maxWidth: 360 }}>
                Essayez de modifier vos filtres ou d'élargir vos critères de recherche.
              </p>
              <button onClick={handleClearFilters}
                style={{ height: 44, padding: '0 28px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-sm)', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
              >
                Effacer tous les filtres
              </button>
            </div>
          ) : (
            <>
              <ProductGrid
                products={paginatedProducts}
                columns={3}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={isWishlisted}
              />

              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 48 }}>
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set('page', String(currentPage - 1));
                      setSearchParams(params);
                    }}
                    style={{
                      height: 40, padding: '0 16px', borderRadius: 'var(--radius-pill)',
                      border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)',
                      color: currentPage <= 1 ? 'var(--c-gray-300)' : 'var(--c-gray-700)',
                      background: 'var(--c-white)', fontWeight: 500,
                    }}
                  >
                    ← Précédent
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.set('page', String(p));
                        setSearchParams(params);
                      }}
                      style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: p === currentPage ? 'var(--c-yellow)' : 'var(--c-white)',
                        color: p === currentPage ? 'var(--c-gray-900)' : 'var(--c-gray-700)',
                        fontWeight: p === currentPage ? 700 : 500,
                        fontSize: 'var(--text-sm)',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (p !== currentPage) e.currentTarget.style.background = 'var(--c-gray-50)';
                      }}
                      onMouseLeave={(e) => {
                        if (p !== currentPage) e.currentTarget.style.background = 'var(--c-white)';
                      }}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set('page', String(currentPage + 1));
                      setSearchParams(params);
                    }}
                    style={{
                      height: 40, padding: '0 16px', borderRadius: 'var(--radius-pill)',
                      border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)',
                      color: currentPage >= totalPages ? 'var(--c-gray-300)' : 'var(--c-gray-700)',
                      background: 'var(--c-white)', fontWeight: 500,
                    }}
                  >
                    Suivant →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(30,29,27,0.5)' }}
            />
            <motion.aside
              initial={{ translateY: '100%' }}
              animate={{ translateY: 0 }}
              exit={{ translateY: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2001, maxHeight: '85vh', background: 'var(--c-white)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--c-gray-100)', flexShrink: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-md)' }}>Filtres</h3>
                <button onClick={() => setMobileFilterOpen(false)} style={{ padding: 8, borderRadius: '50%', color: 'var(--c-gray-500)' }}>
                  <FiX size={20} />
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClear={handleClearFilters}
                />
              </div>
              <div style={{ padding: '16px 24px 24px', borderTop: '1px solid var(--c-gray-100)', flexShrink: 0 }}>
                <button
                  onClick={() => { handleFilterChange(filters); setMobileFilterOpen(false); }}
                  style={{ width: '100%', height: 48, borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-base)', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
                >
                  Voir les résultats ({filteredProducts.length})
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
