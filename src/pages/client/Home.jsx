import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiChevronLeft, FiChevronRight, FiInstagram } from 'react-icons/fi';
import toast from 'react-hot-toast';
import products from '../../data/products';
import HeroBanner from '../../components/client/HeroBanner';
import CategoryPill from '../../components/client/CategoryPill';
import SectionHeading from '../../components/client/SectionHeading';
import ProductCard from '../../components/client/ProductCard';
import ReviewCard from '../../components/client/ReviewCard';
import NewsletterBanner from '../../components/client/NewsletterBanner';
import formatCurrency from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const CATEGORIES = [
  { name: 'Nouveaux-nés', icon: '👶', count: 5 },
  { name: 'Bébé', icon: '🍼', count: 6 },
  { name: 'Tout-petits', icon: '🧸', count: 5 },
  { name: 'Enfants', icon: '🧒', count: 4 },
  { name: 'Knitwear', icon: '🧶', count: 8 },
  { name: 'Manteaux', icon: '🧥', count: 6 },
  { name: 'Accessoires', icon: '🎀', count: 2 },
];

const FEATURES = [
  { title: 'Coton biologique certifié', desc: 'Tissus doux et respectueux de la peau de bébé, certifiés GOTS et OEKO-TEX.' },
  { title: 'Fabrication artisanale algérienne', desc: 'Chaque pièce est confectionnée avec soin par nos artisans locaux.' },
  { title: 'Teintures naturelles sans produits chimiques', desc: 'Des couleurs douces obtenues à partir de pigments naturels non toxiques.' },
  { title: 'Emballages éco-responsables', desc: 'Emballages en papier recyclé et matériaux biodégradables.' },
];

const INSTAGRAM_POSTS = [
  'https://t4.ftcdn.net/jpg/06/29/41/61/360_F_629416158_owvmTg2Kp6GVw7NZQ1swCKkLUaSsVPqW.jpg', 'https://t4.ftcdn.net/jpg/06/29/41/61/360_F_629416158_owvmTg2Kp6GVw7NZQ1swCKkLUaSsVPqW.jpg',
  'https://t4.ftcdn.net/jpg/06/29/41/61/360_F_629416158_owvmTg2Kp6GVw7NZQ1swCKkLUaSsVPqW.jpg', 'https://t4.ftcdn.net/jpg/06/29/41/61/360_F_629416158_owvmTg2Kp6GVw7NZQ1swCKkLUaSsVPqW.jpg',
  'https://t4.ftcdn.net/jpg/06/29/41/61/360_F_629416158_owvmTg2Kp6GVw7NZQ1swCKkLUaSsVPqW.jpg', 'https://t4.ftcdn.net/jpg/06/29/41/61/360_F_629416158_owvmTg2Kp6GVw7NZQ1swCKkLUaSsVPqW.jpg',
];

export default function Home() {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const newArrivals = products.filter((p) => p.isNew && p.isActive).slice(0, 8);
  const bestsellers = products.filter((p) => p.isBestseller && p.isActive).slice(0, 8);
  const allReviews = products.flatMap((p) => p.reviews || []).slice(0, 6);

  const handleAddToCart = (product, size, color, qty) => {
    addItem(product, size, color, qty);
    toast.success(`${product.name} ajouté au panier !`);
  };

  const handleToggleWishlist = (id) => {
    toggle(id);
    toast(isWishlisted(id) ? 'Retiré des favoris' : 'Ajouté aux favoris');
  };

  const [bsScrollPos, setBsScrollPos] = useState(0);
  const scrollBestsellers = (dir) => {
    const container = document.getElementById('bestsellers-scroll');
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
      setBsScrollPos(container.scrollLeft + dir * scrollAmount);
    }
  };

  return (
    <div>
      <HeroBanner />

      <section style={{ padding: '48px 32px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}
          className="category-strip"
        >
          <style>{`.category-strip::-webkit-scrollbar { display: none; }`}</style>
          {CATEGORIES.map((cat) => (
            <CategoryPill key={cat.name} name={cat.name} icon={cat.icon} count={cat.count} />
          ))}
        </div>
      </section>

      <section style={{ padding: '0 32px 64px', maxWidth: 1440, margin: '0 auto' }}>
        <SectionHeading title="Nouveautés" subtitle="Les dernières pièces de notre collection" linkText="Voir tout" linkTo="/boutique?sort=newest" />
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
            className="new-grid"
          >
            <style>{`@media (max-width: 1024px) { .new-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 480px) { .new-grid { grid-template-columns: 1fr !important; } }`}</style>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <div className="skeleton" style={{ aspectRatio: '1/1', width: '100%' }} />
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div className="skeleton" style={{ height: 14, width: '40%' }} />
                  <div className="skeleton" style={{ height: 18, width: '80%' }} />
                  <div className="skeleton" style={{ height: 14, width: '60%' }} />
                  <div className="skeleton" style={{ height: 36, width: '100%', borderRadius: 'var(--radius-pill)' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
            className="new-grid"
          >
            <style>{`@media (max-width: 1024px) { .new-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 480px) { .new-grid { grid-template-columns: 1fr !important; } }`}</style>
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={isWishlisted(product.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section style={{ padding: '64px 32px', background: 'var(--c-surface)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}
            className="brand-story-grid"
          >
            <style>{`@media (max-width: 768px) { .brand-story-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
              <img src="https://t4.ftcdn.net/jpg/06/29/41/61/360_F_629416158_owvmTg2Kp6GVw7NZQ1swCKkLUaSsVPqW.jpg" alt="CHICKS Story"
                style={{ width: '70%', borderRadius: 'var(--radius-lg)', objectFit: 'cover', aspectRatio: '4/5', position: 'relative', zIndex: 2, boxShadow: 'var(--shadow-hover)' }}
              />
              <img src="https://t4.ftcdn.net/jpg/06/29/41/61/360_F_629416158_owvmTg2Kp6GVw7NZQ1swCKkLUaSsVPqW.jpg" alt=""
                style={{ position: 'absolute', bottom: '5%', left: '5%', width: '45%', borderRadius: 'var(--radius-lg)', objectFit: 'cover', aspectRatio: '3/4', zIndex: 3, border: '4px solid var(--c-white)', boxShadow: 'var(--shadow-hover)' }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{ position: 'absolute', top: '5%', right: '8%', background: 'var(--c-yellow)', borderRadius: '50%', width: 100, height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 4, boxShadow: 'var(--shadow-hover)' }}
              >
                <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--c-gray-900)', lineHeight: 1 }}>5+</span>
                <span style={{ fontSize: 10, color: 'var(--c-gray-700)', fontWeight: 500 }}>Ans d'amour</span>
              </motion.div>
            </div>
            <div>
              <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
                Pourquoi CHICKS™ ?
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-2xl)', color: 'var(--c-gray-900)', marginBottom: 16, lineHeight: 1.2 }}>
                Des vêtements conçus avec amour pour vos petits
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-500)', lineHeight: 1.7, marginBottom: 32 }}>
                Chez CHICKS, nous croyons que chaque enfant mérite le meilleur. C'est pourquoi nous sélectionnons avec soin des matières nobles et durables, tout en soutenant le savoir-faire artisanal algérien.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {FEATURES.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--c-yellow-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <FiCheck size={16} style={{ color: 'var(--c-yellow-deep)' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--c-gray-900)', marginBottom: 4 }}>{f.title}</h4>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--c-gray-500)', lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 32px', maxWidth: 1440, margin: '0 auto' }}>
        <SectionHeading title="Meilleures ventes" subtitle="Les articles préférés de nos clients" />
        <div style={{ position: 'relative' }}>
          <button onClick={() => scrollBestsellers(-1)}
            style={{ position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 44, height: 44, borderRadius: '50%', background: 'var(--c-white)', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'box-shadow 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-card)'}
          >
            <FiChevronLeft size={20} />
          </button>
          <button onClick={() => scrollBestsellers(1)}
            style={{ position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 44, height: 44, borderRadius: '50%', background: 'var(--c-white)', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'box-shadow 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-card)'}
          >
            <FiChevronRight size={20} />
          </button>
          <div
            id="bestsellers-scroll"
            style={{ display: 'flex', gap: 24, overflowX: 'auto', scrollSnapType: 'x mandatory', padding: '8px 4px', scrollbarWidth: 'none' }}
            className="bs-scroll"
          >
            <style>{`.bs-scroll::-webkit-scrollbar { display: none; }`}</style>
            {bestsellers.map((product) => (
              <div key={product.id} style={{ minWidth: 280, scrollSnapAlign: 'start' }}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={isWishlisted(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 32px', background: 'var(--c-offwhite)' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <SectionHeading title="Ils nous adorent" subtitle="Ce que disent nos clients" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
            className="testimonials-grid"
          >
            <style>{`@media (max-width: 1024px) { .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 600px) { .testimonials-grid { grid-template-columns: 1fr !important; } }`}</style>
            {allReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 32px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <SectionHeading title="@chicks_algerie" subtitle="Suivez-nous sur Instagram" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}
            className="insta-grid"
          >
            <style>{`@media (max-width: 768px) { .insta-grid { grid-template-columns: repeat(3, 1fr) !important; } } @media (max-width: 480px) { .insta-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
            {INSTAGRAM_POSTS.map((src, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                className="insta-item"
              >
                <style>{`.insta-item:hover .insta-overlay { opacity: 1; } .insta-item:hover img { transform: scale(1.08); }`}</style>
                <img src={src} alt={`Instagram ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                />
                <div className="insta-overlay"
                  style={{ position: 'absolute', inset: 0, background: 'rgba(30,29,27,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s' }}
                >
                  <FiInstagram size={28} color="#fff" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBanner />
    </div>
  );
}
