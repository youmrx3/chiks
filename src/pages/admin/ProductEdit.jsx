import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAdmin } from '../../context/AdminContext';
import ProductForm from '../../components/admin/ProductForm';

export default function ProductEdit() {
  const { id } = useParams();
  const { products, updateProduct } = useAdmin();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const handleSubmit = (data) => {
    updateProduct(id, {
      ...data,
      images: data.images.map((img) => (typeof img === 'string' ? img : img.preview || img)),
    });
    toast.success(`Produit "${data.name}" mis à jour !`);
    navigate('/admin/produits');
  };

  if (!product) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
        style={{ textAlign: 'center', padding: '80px 20px' }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--c-gray-900)', marginBottom: '8px' }}>
          Produit introuvable
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--c-gray-500)', marginBottom: '24px' }}>
          Le produit avec l'ID "{id}" n'existe pas.
        </p>
        <button
          onClick={() => navigate('/admin/produits')}
          style={{ padding: '10px 24px', borderRadius: 'var(--radius-pill)', background: 'var(--c-yellow)', color: 'var(--c-gray-900)', fontWeight: 700, fontSize: '13px', border: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-hover)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-yellow)'; }}
        >
          Retour aux produits
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--c-gray-900)', fontFamily: 'var(--font-display)' }}>
          Modifier : {product.name}
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--c-gray-500)', marginTop: '4px' }}>
          {product.id} · {product.category} · {product.sku}
        </p>
      </div>
      <ProductForm product={product} onSubmit={handleSubmit} onCancel={() => navigate('/admin/produits')} />
    </motion.div>
  );
}
