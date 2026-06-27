import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import products from '../../data/products';

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Boutique', to: '/boutique' },
  { label: 'Collections', to: '/boutique?collection=all' },
  { label: 'À Propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) { setQuery(''); return; }
    const timer = setTimeout(() => searchRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [searchOpen]);

  useEffect(() => {
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target) && !e.target.closest('[data-search-toggle]')) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: 72,
        background: 'var(--c-white)',
        borderBottom: scrolled ? 'none' : '1px solid var(--c-gray-100)',
        boxShadow: scrolled ? 'var(--shadow-card)' : 'none',
        transition: 'box-shadow 0.3s, border-color 0.3s',
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
      }}
    >
      <div style={{ maxWidth: 1440, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4C10 4 6 10 6 16C6 20 8 24 12 26C10 24 9 21 9 18C9 14 11 10 16 10C21 10 23 14 23 18C23 21 22 24 20 26C24 24 26 20 26 16C26 10 22 4 16 4Z" fill="var(--c-yellow)"/>
            <path d="M12 18C12 16 13 14 16 14C19 14 20 16 20 18C20 20 18 22 16 22C14 22 12 20 12 18Z" fill="var(--c-yellow-deep)"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--c-gray-900)', letterSpacing: '-0.5px' }}>
            CHICKS<sup style={{ fontSize: 10, top: '-8px', position: 'relative' }}>™</sup>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                padding: '8px 16px',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: isActive ? 'var(--c-yellow-deep)' : 'var(--c-gray-700)',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid var(--c-yellow)' : '2px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
                whiteSpace: 'nowrap',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button data-search-toggle onClick={() => setSearchOpen((o) => !o)} style={{ position: 'relative', padding: 10, color: 'var(--c-gray-700)', borderRadius: 'var(--radius-sm)', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-gray-50)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            aria-label="Rechercher"
          >
            {searchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
          </button>

          <button onClick={() => navigate('/favoris')} style={{ position: 'relative', padding: 10, color: 'var(--c-gray-700)', borderRadius: 'var(--radius-sm)', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-gray-50)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            aria-label="Favoris"
          >
            <FiHeart size={20} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16,
                background: 'var(--c-red)', color: '#fff', fontSize: 10, fontWeight: 700,
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 3px', lineHeight: 1,
              }}>{wishlistCount}</span>
            )}
          </button>

          <button onClick={() => navigate('/panier')} style={{ position: 'relative', padding: 10, color: 'var(--c-gray-700)', borderRadius: 'var(--radius-sm)', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-gray-50)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            aria-label="Panier"
          >
            <FiShoppingBag size={20} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16,
                background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontSize: 10, fontWeight: 700,
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 3px', lineHeight: 1,
              }}>{totalItems}</span>
            )}
          </button>

          <button onClick={() => navigate('/compte')} style={{ padding: 10, color: 'var(--c-gray-700)', borderRadius: 'var(--radius-sm)', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-gray-50)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            aria-label="Compte"
          >
            <FiUser size={20} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div ref={searchRef} style={{
          position: 'absolute', top: 72, left: 0, right: 0, background: 'var(--c-white)',
          borderBottom: '1px solid var(--c-gray-100)', boxShadow: 'var(--shadow-card)',
          padding: '16px 32px 24px', zIndex: 999,
        }}>
          <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
            <FiSearch size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-gray-500)' }} />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un produit..."
              style={{
                width: '100%', height: 48, padding: '0 16px 0 44px', borderRadius: 'var(--radius-pill)',
                border: '2px solid var(--c-gray-100)', fontSize: 'var(--text-base)',
                background: 'var(--c-offwhite)', color: 'var(--c-gray-900)',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', padding: 4, color: 'var(--c-gray-500)' }}>
                <FiX size={16} />
              </button>
            )}
          </div>

          {query && (
            <div style={{ maxWidth: 600, margin: '12px auto 0', maxHeight: 320, overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--c-gray-500)', fontSize: 'var(--text-sm)', padding: 16 }}>Aucun produit trouvé</p>
              ) : (
                filtered.slice(0, 6).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { navigate(`/produit/${p.slug}`); setSearchOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)', transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-gray-50)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src={p.images[0]} alt={p.name} style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}>{p.name}</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--c-gray-500)' }}>{p.category} — {p.salePrice ? `${(p.salePrice).toLocaleString()} DA` : `${(p.price).toLocaleString()} DA`}</p>
                    </div>
                  </button>
                ))
              )}
              {filtered.length > 6 && (
                <button
                  onClick={() => { navigate(`/boutique?search=${encodeURIComponent(query)}`); setSearchOpen(false); }}
                  style={{ display: 'block', width: '100%', textAlign: 'center', padding: '8px', fontSize: 'var(--text-sm)', color: 'var(--c-yellow-deep)', fontWeight: 600 }}
                >
                  Voir tous les résultats ({filtered.length})
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
