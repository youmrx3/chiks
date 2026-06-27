import { createContext, useContext, useState, useCallback } from 'react';
import initialProducts from '../data/products';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser] = useState({
    name: 'Rania Chekroun',
    role: 'Super Admin',
    avatar: 'RC',
    email: 'rania@chicks.dz',
  });
  const [products, setProducts] = useState(initialProducts);

  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const updateOrderStatus = useCallback((orderId, status, note) => {
    // In a real app this would call an API
    console.log('Order status updated:', orderId, status, note);
  }, []);

  const updateStock = useCallback((productId, size, qty) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stockPerSize: { ...p.stockPerSize, [size]: Math.max(0, qty) } }
          : p
      )
    );
  }, []);

  const addProduct = useCallback((product) => {
    setProducts((prev) => [product, ...prev]);
  }, []);

  const updateProduct = useCallback((id, data) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        adminUser,
        login,
        logout,
        products,
        setProducts,
        updateOrderStatus,
        updateStock,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
