import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/client/Navbar';
import MobileNav from './components/client/MobileNav';
import Footer from './components/client/Footer';
import CartDrawer from './components/client/CartDrawer';
import ScrollToTop from './components/client/ScrollToTop';

import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';

import Home from './pages/client/Home';
import Shop from './pages/client/Shop';
import ProductDetail from './pages/client/ProductDetail';
import Cart from './pages/client/Cart';
import Checkout from './pages/client/Checkout';
import OrderConfirmation from './pages/client/OrderConfirmation';
import Account from './pages/client/Account';
import OrderHistory from './pages/client/OrderHistory';
import WishlistPage from './pages/client/Wishlist';
import NotFound from './pages/client/NotFound';

import Dashboard from './pages/admin/Dashboard';
import ProductsPage from './pages/admin/Products';
import ProductAdd from './pages/admin/ProductAdd';
import ProductEdit from './pages/admin/ProductEdit';
import OrdersPage from './pages/admin/Orders';
import OrderDetail from './pages/admin/OrderDetail';
import Inventory from './pages/admin/Inventory';
import Finance from './pages/admin/Finance';
import CustomersPage from './pages/admin/Customers';
import CustomerDetail from './pages/admin/CustomerDetail';
import Settings from './pages/admin/Settings';

function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>{children}</main>
      <Footer />
      <MobileNav />
      <CartDrawer />
      <ScrollToTop />
    </>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const isAdmin = path.startsWith('/admin');
    if (isAdmin) {
      let title = '';
      if (path.startsWith('/admin/produits/') && path !== '/admin/produits' && path !== '/admin/produits/nouveau') title = 'Modifier produit';
      else if (path.startsWith('/admin/commandes/') && path !== '/admin/commandes') title = 'Détail commande';
      else if (path.startsWith('/admin/clients/') && path !== '/admin/clients') title = 'Détail client';
      else {
        const titles = {
          '/admin/login': 'Connexion',
          '/admin/dashboard': 'Tableau de bord',
          '/admin/produits': 'Produits',
          '/admin/produits/nouveau': 'Nouveau produit',
          '/admin/commandes': 'Commandes',
          '/admin/inventaire': 'Inventaire',
          '/admin/finances': 'Finances',
          '/admin/clients': 'Clients',
          '/admin/parametres': 'Paramètres',
        };
        title = titles[path] || '';
      }
      document.title = `CHICKS Admin — ${title}`;
    } else {
      const titles = {
        '/': 'Accueil',
        '/boutique': 'Boutique',
        '/panier': 'Panier',
        '/commande': 'Commande',
        '/compte': 'Mon compte',
        '/mes-commandes': 'Mes commandes',
        '/favoris': 'Mes favoris',
      };
      document.title = `CHICKS™ — ${titles[path] || ''}`;
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="produits" element={<ProductsPage />} />
          <Route path="produits/nouveau" element={<ProductAdd />} />
          <Route path="produits/:id" element={<ProductEdit />} />
          <Route path="commandes" element={<OrdersPage />} />
          <Route path="commandes/:id" element={<OrderDetail />} />
          <Route path="inventaire" element={<Inventory />} />
          <Route path="finances" element={<Finance />} />
          <Route path="clients" element={<CustomersPage />} />
          <Route path="clients/:id" element={<CustomerDetail />} />
          <Route path="parametres" element={<Settings />} />
        </Route>

        <Route
          path="*"
          element={
            <ClientLayout>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28 }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/boutique" element={<Shop />} />
                  <Route path="/produit/:slug" element={<ProductDetail />} />
                  <Route path="/panier" element={<Cart />} />
                  <Route path="/commande" element={<Checkout />} />
                  <Route path="/confirmation/:id" element={<OrderConfirmation />} />
                  <Route path="/compte" element={<Account />} />
                  <Route path="/mes-commandes" element={<OrderHistory />} />
                  <Route path="/favoris" element={<WishlistPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            </ClientLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
