import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiHeart, FiShoppingBag, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import products from '../../data/products';
import BreadCrumb from '../../components/client/BreadCrumb';
import StarRating from '../../components/client/StarRating';
import ReviewCard from '../../components/client/ReviewCard';
import ProductCard from '../../components/client/ProductCard';
import SizeGuideModal from '../../components/client/SizeGuideModal';
import formatCurrency from '../../utils/formatCurrency';
import getStockStatus from '../../utils/stockStatus';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const product = useMemo(() => products.find((p) => p.slug === slug && p.isActive), [slug]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState({ description: true, composition: false, livraison: false });
  const [reviewsVisible, setReviewsVisible] = useState(4);

  if (!product) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: 32, textAlign: 'center' }}>
        <span style={{ fontSize: 64, marginBottom: 16 }}>🔍</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-xl)', color: 'var(--c-gray-900)', marginBottom: 12 }}>
          Produit non trouvé
        </h2>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-500)', marginBottom: 32, maxWidth: 400 }}>
          Le produit que vous recherchez n'existe pas ou n'est plus disponible.
        </p>
        <Link to="/boutique"
          style={{ height: 48, padding: '0 36px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-base)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const defaultSize = product.sizes.find((s) => product.stockPerSize[s] > 0) || product.sizes[0];
  const effectiveSize = selectedSize || defaultSize;
  const effectiveColor = selectedColor || (product.colors[0]?.name || null);
  const stockQty = product.stockPerSize[effectiveSize] || 0;
  const stockStatus = getStockStatus(stockQty);
  const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;

  const thumbnails = product.images.length >= 3
    ? product.images.slice(0, 3)
    : [...product.images, ...product.images].slice(0, 3);

  const handleAddToCart = () => {
    if (stockQty === 0) {
      toast.error('Ce produit est en rupture de stock');
      return;
    }
    addItem(product, effectiveSize, effectiveColor, quantity);
    toast.success(`${product.name} ajouté au panier !`);
  };

  const handleToggleWishlist = () => {
    toggle(product.id);
    toast(isWishlisted(product.id) ? 'Retiré des favoris' : 'Ajouté aux favoris');
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id && p.isActive
  ).slice(0, 4);

  const toggleDetail = (key) => {
    setDetailsOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ratingBreakdown = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const allReviews = product.reviews || [];
    allReviews.forEach((r) => { if (counts[r.rating] !== undefined) counts[r.rating]++; });
    const total = allReviews.length || 1;
    return Object.entries(counts).map(([star, count]) => ({
      star: Number(star),
      count,
      pct: Math.round((count / total) * 100),
    })).reverse();
  }, [product.reviews]);

  const visibleReviews = (product.reviews || []).slice(0, reviewsVisible);

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '24px 32px 64px' }}>
      <BreadCrumb items={[
        { label: 'Accueil', link: '/' },
        { label: 'Boutique', link: '/boutique' },
        { label: product.category, link: `/boutique?categories=${product.category}` },
        { label: product.name },
      ]} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 24 }}
        className="product-detail-grid"
      >
        <style>{`@media (max-width: 900px) { .product-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>

        <div>
          <div
            onClick={() => setLightboxOpen(true)}
            style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'zoom-in', background: 'var(--c-gray-50)' }}
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(245,200,66,0.06), rgba(141,213,208,0.04))', pointerEvents: 'none' }} />
            {product.isNew && (
              <span style={{ position: 'absolute', top: 16, left: 16, padding: '6px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--c-mint)', color: '#fff', fontSize: 11, fontWeight: 700, zIndex: 2 }}>NOUVEAU</span>
            )}
            {discount > 0 && (
              <span style={{ position: 'absolute', top: 16, left: product.isNew ? 120 : 16, padding: '6px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--c-red)', color: '#fff', fontSize: 11, fontWeight: 700, zIndex: 2 }}>-{discount}%</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            {thumbnails.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                style={{
                  width: 80, height: 80, borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                  border: `2px solid ${i === selectedImage ? 'var(--c-yellow)' : 'var(--c-gray-100)'}`,
                  opacity: i === selectedImage ? 1 : 0.6,
                  transition: 'border-color 0.2s, opacity 0.2s',
                }}
              >
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', fontSize: 11, fontWeight: 600, marginBottom: 12 }}>
            {product.category}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xl)', color: 'var(--c-gray-900)', marginBottom: 12 }}>
            {product.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
            {product.salePrice ? (
              <>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--c-yellow-deep)' }}>
                  {formatCurrency(product.salePrice)}
                </span>
                <span style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-500)', textDecoration: 'line-through' }}>
                  {formatCurrency(product.price)}
                </span>
                <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--c-red-pale)', color: 'var(--c-red-deep)', fontSize: 11, fontWeight: 700 }}>
                  -{discount}%
                </span>
              </>
            ) : (
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--c-gray-900)' }}>
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: stockStatus.color }} />
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: stockStatus.textColor }}>
              {stockStatus.label}
            </span>
            {stockQty > 0 && stockQty < 10 && (
              <span style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>(Plus que {stockQty})</span>
            )}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}>Taille</span>
              <button onClick={() => setSizeGuideOpen(true)}
                style={{ fontSize: 11, color: 'var(--c-yellow-deep)', fontWeight: 600, textDecoration: 'underline' }}
              >
                Guide des tailles
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {product.sizes.map((size) => {
                const outOfStock = product.stockPerSize[size] === 0;
                return (
                  <button
                    key={size}
                    onClick={() => !outOfStock && setSelectedSize(size)}
                    disabled={outOfStock}
                    style={{
                      padding: '10px 20px', borderRadius: 'var(--radius-pill)',
                      border: `1px solid ${effectiveSize === size ? 'var(--c-yellow)' : outOfStock ? 'var(--c-gray-100)' : 'var(--c-gray-100)'}`,
                      background: effectiveSize === size ? 'var(--c-yellow-pale)' : outOfStock ? 'var(--c-gray-50)' : 'var(--c-white)',
                      color: effectiveSize === size ? 'var(--c-yellow-deep)' : outOfStock ? 'var(--c-gray-300)' : 'var(--c-gray-700)',
                      fontSize: 'var(--text-sm)', fontWeight: effectiveSize === size ? 700 : 500,
                      cursor: outOfStock ? 'not-allowed' : 'pointer',
                      textDecoration: outOfStock ? 'line-through' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)', display: 'block', marginBottom: 8 }}>Couleur</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: c.hex,
                    border: `3px solid ${effectiveColor === c.name ? 'var(--c-yellow)' : 'transparent'}`,
                    outline: effectiveColor === c.name ? '2px solid var(--c-yellow)' : 'none',
                    outlineOffset: 2,
                    boxShadow: c.hex === '#FFFFFF' || c.hex === '#FDFBF7' || c.hex === '#FAF3DC' ? 'inset 0 0 0 1px var(--c-gray-100)' : 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => { if (effectiveColor !== c.name) e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--c-gray-500)', marginTop: 6 }}>{effectiveColor}</p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)', display: 'block', marginBottom: 8 }}>Quantité</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1px solid var(--c-gray-100)', borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                style={{ padding: '10px 14px', color: quantity <= 1 ? 'var(--c-gray-300)' : 'var(--c-gray-700)', transition: 'color 0.2s' }}
              >
                <FiMinus size={16} />
              </button>
              <span style={{ minWidth: 48, textAlign: 'center', fontSize: 'var(--text-base)', fontWeight: 600 }}>{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(stockQty || 99, quantity + 1))}
                disabled={quantity >= (stockQty || 99)}
                style={{ padding: '10px 14px', color: quantity >= (stockQty || 99) ? 'var(--c-gray-300)' : 'var(--c-gray-700)', transition: 'color 0.2s' }}
              >
                <FiPlus size={16} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <button
              onClick={handleAddToCart}
              disabled={stockQty === 0}
              style={{
                flex: 1, minWidth: 200, height: 52, borderRadius: 'var(--radius-pill)',
                background: stockQty === 0 ? 'var(--c-gray-100)' : 'var(--c-yellow)',
                color: stockQty === 0 ? 'var(--c-gray-500)' : 'var(--c-gray-900)',
                fontWeight: 700, fontSize: 'var(--text-base)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                cursor: stockQty === 0 ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { if (stockQty > 0) e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
              onMouseLeave={(e) => { if (stockQty > 0) e.currentTarget.style.background = 'var(--c-yellow)'; }}
            >
              <FiShoppingBag size={18} />
              {stockQty === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
            </button>
            <button
              onClick={handleToggleWishlist}
              style={{
                height: 52, width: 52, borderRadius: '50%',
                border: '1px solid var(--c-gray-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isWishlisted(product.id) ? 'var(--c-red)' : 'var(--c-gray-500)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { if (!isWishlisted(product.id)) e.currentTarget.style.borderColor = 'var(--c-gray-300)'; }}
              onMouseLeave={(e) => { if (!isWishlisted(product.id)) e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
            >
              <FiHeart size={20} fill={isWishlisted(product.id) ? 'var(--c-red)' : 'none'} />
            </button>
          </div>

          <Link to="/commande"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              height: 48, borderRadius: 'var(--radius-pill)',
              border: '2px solid var(--c-gray-900)', color: 'var(--c-gray-900)',
              fontWeight: 600, fontSize: 'var(--text-base)',
              transition: 'background 0.2s, color 0.2s', marginBottom: 24,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-900)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-900)'; }}
          >
            Commander maintenant
          </Link>

          <div style={{ borderTop: '1px solid var(--c-gray-100)' }}>
            {[
              { key: 'description', label: 'Description', content: product.description },
              { key: 'composition', label: 'Composition & Entretien', content: `${product.material}\n\n${product.washInstruction}${product.features?.length ? '\n\nCaractéristiques :\n• ' + product.features.join('\n• ') : ''}` },
              { key: 'livraison', label: 'Livraison & Retours', content: 'Livraison offerte dès 5 000 DA d\'achat. Délais de livraison : 3 à 5 jours ouvrés (Standard), 24 à 48h (Express). Retours acceptés sous 14 jours. Les articles doivent être non portés, non lavés, avec leurs étiquettes.' },
            ].map(({ key, label, content }) => (
              <div key={key} style={{ borderBottom: '1px solid var(--c-gray-100)' }}>
                <button
                  onClick={() => toggleDetail(key)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '16px 0', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}
                >
                  {label}
                  {detailsOpen[key] ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
                <AnimatePresence>
                  {detailsOpen[key] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)', lineHeight: 1.7, paddingBottom: 16, whiteSpace: 'pre-line' }}>
                        {content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section style={{ marginTop: 64 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--c-gray-900)', marginBottom: 24 }}>
          Avis clients ({product.reviewCount})
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 32, marginBottom: 32 }}
          className="reviews-layout"
        >
          <style>{`@media (max-width: 768px) { .reviews-layout { grid-template-columns: 1fr !important; } }`}</style>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 48, fontWeight: 700, color: 'var(--c-gray-900)' }}>{product.rating}</span>
              <span style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-500)' }}>/ 5</span>
            </div>
            <StarRating rating={product.rating} />
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)', marginTop: 4 }}>{product.reviewCount} avis</p>

            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {ratingBreakdown.map((r) => (
                <div key={r.star} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--c-gray-700)', width: 50 }}>{r.star} ★</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'var(--c-gray-100)' }}>
                    <div style={{ width: `${r.pct}%`, height: '100%', borderRadius: 4, background: 'var(--c-yellow)' }} />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--c-gray-500)', width: 30, textAlign: 'right' }}>{r.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {visibleReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {product.reviews && reviewsVisible < product.reviews.length && (
              <button
                onClick={() => setReviewsVisible((prev) => prev + 4)}
                style={{ marginTop: 20, height: 44, padding: '0 28px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--c-gray-100)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-700)', transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--c-gray-300)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--c-gray-100)'}
              >
                Voir plus d'avis ({product.reviews.length - reviewsVisible})
              </button>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section style={{ marginTop: 64 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--c-gray-900)', marginBottom: 24 }}>
            Vous aimerez aussi
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
            className="related-grid"
          >
            <style>{`@media (max-width: 1024px) { .related-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 480px) { .related-grid { grid-template-columns: 1fr !important; } }`}</style>
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={(product, size, color, qty) => {
                  addItem(product, size, color, qty);
                  toast.success(`${product.name} ajouté au panier !`);
                }}
                onToggleWishlist={toggle}
                isWishlisted={isWishlisted(p.id)}
              />
            ))}
          </div>
        </section>
      )}

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 5000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}
          >
            <button onClick={() => setLightboxOpen(false)}
              style={{ position: 'absolute', top: 24, right: 24, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              <FiX size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={product.images[selectedImage]}
              alt={product.name}
              style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
