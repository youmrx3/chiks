import { NavLink } from 'react-router-dom';
import { FiHome, FiGrid, FiShoppingBag, FiHeart, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const TABS = [
  { label: 'Accueil', to: '/', icon: FiHome },
  { label: 'Boutique', to: '/boutique', icon: FiGrid },
  { label: 'Panier', to: '/panier', icon: FiShoppingBag, badge: 'cart' },
  { label: 'Favoris', to: '/favoris', icon: FiHeart, badge: 'wishlist' },
  { label: 'Compte', to: '/compte', icon: FiUser },
];

export default function MobileNav() {
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();

  const getBadge = (badge) => {
    if (badge === 'cart') return totalItems;
    if (badge === 'wishlist') return wishlistCount;
    return 0;
  };

  return (
    <div
      style={{
        display: 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        height: 64,
        background: 'var(--c-white)',
        borderTop: '1px solid var(--c-gray-100)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      className="mobile-nav"
    >
      <style>{`@media (max-width: 1023px) { .mobile-nav { display: flex !important; } }`}</style>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100%', padding: '0 8px' }}>
        {TABS.map(({ label, to, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 2, padding: '6px 12px', borderRadius: 'var(--radius-sm)',
              textDecoration: 'none', color: isActive ? 'var(--c-yellow)' : 'var(--c-gray-500)',
              transition: 'color 0.2s', position: 'relative', minWidth: 56,
            })}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={22} />
              {badge && getBadge(badge) > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -8, minWidth: 16, height: 16,
                  background: 'var(--c-red)', color: '#fff', fontSize: 9, fontWeight: 700,
                  borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 3px', lineHeight: 1,
                }}>{getBadge(badge)}</span>
              )}
            </div>
            <span style={{ fontSize: 10, fontWeight: 500 }}>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
