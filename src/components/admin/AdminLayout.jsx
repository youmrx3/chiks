import { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout() {
  const { isAuthenticated } = useAdmin();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 768 && w < 1024) {
        setSidebarCollapsed(true);
        setSidebarOpen(false);
      } else if (w >= 1024) {
        setSidebarCollapsed(false);
        setSidebarOpen(false);
      } else {
        setSidebarCollapsed(false);
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--c-offwhite)' }}>
      <AdminSidebar
        collapsed={sidebarCollapsed}
        open={sidebarOpen}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        onClose={() => setSidebarOpen(false)}
      />
      <div
        style={{
          marginLeft: sidebarCollapsed ? '64px' : '260px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          transition: 'margin-left 0.25s ease',
        }}
      >
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main style={{ flex: 1, padding: '24px 32px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 99,
          }}
        />
      )}
      <style>{`
        @media (max-width: 767px) {
          .admin-content { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
