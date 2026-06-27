import { useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import formatCurrency from '../../utils/formatCurrency';

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  const navigate = useNavigate();
  const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;

  const handleCardClick = () => navigate(`/produit/${product.slug}`);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      const defaultSize = product.sizes.find((s) => product.stockPerSize[s] > 0) || product.sizes[0];
      const defaultColor = product.colors[0]?.name;
      onAddToCart(product, defaultSize, defaultColor, 1);
    }
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) onToggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        background: 'var(--c-white)', borderRadius: 'var(--radius-md)',
        overflow: 'hidden', boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        cursor: 'pointer', display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--c-gray-50)' }}>
        <img
          src={product.images[0]}
          alt={product.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(245,200,66,0.08), rgba(141,213,208,0.06))', pointerEvents: 'none' }} />

        {product.isNew && (
          <span style={{
            position: 'absolute', top: 10, left: 10, padding: '4px 10px',
            borderRadius: 'var(--radius-pill)', background: 'var(--c-mint)',
            color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
          }}>
            NOUVEAU
          </span>
        )}
        {discount > 0 && (
          <span style={{
            position: 'absolute', top: 10, left: product.isNew ? 92 : 10, padding: '4px 10px',
            borderRadius: 'var(--radius-pill)', background: 'var(--c-red)',
            color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
          }}>
            -{discount}%
          </span>
        )}
        {product.isBestseller && !product.isNew && discount === 0 && (
          <span style={{
            position: 'absolute', top: 10, left: 10, padding: '4px 10px',
            borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)',
            color: 'var(--c-gray-900)', fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
          }}>
            ★ Bestseller
          </span>
        )}

        <button
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          style={{
            position: 'absolute', top: 10, right: 10, width: 36, height: 36,
            borderRadius: '50%', background: 'var(--c-white)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
          }}
        >
          <FiHeart
            size={17}
            style={{
              fill: isWishlisted ? 'var(--c-red)' : 'none',
              stroke: isWishlisted ? 'var(--c-red)' : 'var(--c-gray-500)',
              transition: 'fill 0.2s, stroke 0.2s',
            }}
          />
        </button>
      </div>

      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        <span style={{
          display: 'inline-block', padding: '2px 10px', borderRadius: 'var(--radius-pill)',
          background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)',
          fontSize: 10, fontWeight: 600, alignSelf: 'flex-start',
        }}>
          {product.category}
        </span>

        <h3 style={{
          fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--c-gray-900)',
          lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', gap: 1 }}>
            {[1, 2, 3, 4, 5].map((star) => {
              const filled = product.rating >= star;
              const partial = product.rating >= star - 0.5 && product.rating < star;
              return (
                <span key={star} style={{
                  fontSize: 13, lineHeight: 1,
                  background: partial
                    ? 'linear-gradient(90deg, var(--c-yellow) 50%, var(--c-gray-100) 50%)'
                    : 'none',
                  WebkitBackgroundClip: partial ? 'text' : 'none',
                  WebkitTextFillColor: partial ? 'transparent' : filled ? 'var(--c-yellow)' : 'var(--c-gray-100)',
                  color: filled ? 'var(--c-yellow)' : 'var(--c-gray-100)',
                }}>
                  ★
                </span>
              );
            })}
          </div>
          <span style={{ fontSize: 11, color: 'var(--c-gray-500)' }}>({product.reviewCount})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          {product.salePrice ? (
            <>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--c-yellow-deep)' }}>
                {formatCurrency(product.salePrice)}
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--c-gray-500)', textDecoration: 'line-through' }}>
                {formatCurrency(product.price)}
              </span>
            </>
          ) : (
            <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--c-gray-900)' }}>
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {product.sizes.map((size) => {
            const outOfStock = product.stockPerSize[size] === 0;
            return (
              <span key={size} style={{
                padding: '3px 8px', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--c-gray-100)',
                fontSize: 10, fontWeight: 500, color: outOfStock ? 'var(--c-gray-300)' : 'var(--c-gray-700)',
                background: outOfStock ? 'var(--c-gray-50)' : 'transparent',
              }}>
                {size}
              </span>
            );
          })}
        </div>

        <button
          onClick={handleAddToCart}
          style={{
            marginTop: 'auto', width: '100%', height: 42,
            borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)',
            color: 'var(--c-gray-900)', fontWeight: 700, fontSize: 'var(--text-sm)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-yellow-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--c-yellow)'}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
