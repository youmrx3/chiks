import ProductCard from './ProductCard';

export default function ProductGrid({ products, columns = 3, onAddToCart, onToggleWishlist, isWishlisted }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 24,
      }}
      className="product-grid"
    >
      <style>{`
        @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(${Math.min(columns, 2)}, 1fr) !important; } }
        @media (max-width: 480px) { .product-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={isWishlisted ? isWishlisted(product.id) : false}
        />
      ))}
    </div>
  );
}
