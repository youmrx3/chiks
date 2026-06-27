import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAdmin } from '../../context/AdminContext';
import ProductForm from '../../components/admin/ProductForm';

export default function ProductAdd() {
  const { products, addProduct } = useAdmin();
  const navigate = useNavigate();

  const generateId = () => {
    const maxNum = products.reduce((max, p) => {
      const num = parseInt(p.id.replace('PRD-', ''), 10);
      return num > max ? num : max;
    }, 0);
    return `PRD-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const handleSubmit = (data, status) => {
    const newProduct = {
      id: generateId(),
      ...data,
      slug: data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      isActive: status === 'publish' ? true : data.isActive,
      rating: 0,
      reviewCount: 0,
      reviews: [],
      images: data.images.map((img) => (typeof img === 'string' ? img : img.preview || img)),
      createdAt: new Date().toISOString(),
    };
    addProduct(newProduct);
    toast.success(`Produit "${newProduct.name}" créé avec succès !`);
    navigate('/admin/produits');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--c-gray-900)', fontFamily: 'var(--font-display)' }}>
          Nouveau produit
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--c-gray-500)', marginTop: '4px' }}>
          Créez un nouveau produit pour votre boutique
        </p>
      </div>
      <ProductForm product={null} onSubmit={handleSubmit} onCancel={() => navigate('/admin/produits')} />
    </motion.div>
  );
}
