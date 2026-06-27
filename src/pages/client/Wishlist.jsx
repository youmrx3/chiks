import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import products from '../../data/products';
import ProductCard from '../../components/client/ProductCard';
import BreadCrumb from '../../components/client/BreadCrumb';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Wishlist() {
  const { addItem } = useCart();
  const { items: wishlistIds, toggle, isWishlisted } = useWishlist();

  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id) && p.isActive);
  }, [wishlistIds]);

  const handleAddToCart = (product, size, color, qty) => {
    addItem(product, size, color, qty);
    toast.success(`${product.name} ajouté au panier !`);
  };

  const handleToggleWishlist = (id) => {
    toggle(id);
    toast(isWishlisted(id) ? 'Retiré des favoris' : 'Ajouté aux favoris');
  };

  if (wishlistProducts.length === 0) {
    return (
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 32px 80px' }}>
        <BreadCrumb items={[{ label: 'Accueil', link: '/' }, { label: 'Mes favoris' }]} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: 'var(--c-red-pale)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
          }}>
            <FiHeart size={32} style={{ color: 'var(--c-red)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-xl)', color: 'var(--c-gray-900)', marginBottom: 8 }}>
            Votre liste de favoris est vide
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-500)', marginBottom: 32, maxWidth: 400 }}>
            Ajoutez vos produits préférés à vos favoris en cliquant sur le cœur.
          </p>
          <Link to="/boutique"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 48, padding: '0 36px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-base)', transition: 'background 0.2s' }}
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
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '24px 32px 64px' }}>
      <BreadCrumb items={[{ label: 'Accueil', link: '/' }, { label: 'Mes favoris' }]} />

      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--c-gray-900)', marginTop: 16, marginBottom: 32 }}>
        Mes favoris ({wishlistProducts.length})
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
        className="wishlist-grid"
      >
        <style>{`@media (max-width: 1024px) { .wishlist-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 480px) { .wishlist-grid { grid-template-columns: 1fr !important; } }`}</style>
        {wishlistProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={true}
          />
        ))}
      </div>
    </div>
  );
}
