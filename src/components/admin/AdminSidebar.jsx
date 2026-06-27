import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingCart, FiBox, FiTrendingUp, FiUsers, FiSettings, FiLogOut, FiChevronsLeft } from 'react-icons/fi';
import { useAdmin } from '../../context/AdminContext';

const navItems = [
  { to: '/admin/dashboard', icon: FiHome, label: 'Tableau de bord' },
  { to: '/admin/produits', icon: FiPackage, label: 'Produits', badge: 30 },
  { to: '/admin/commandes', icon: FiShoppingCart, label: 'Commandes', badge: 14 },
  { to: '/admin/inventaire', icon: FiBox, label: 'Inventaire', badge: 7, badgeColor: 'orange' },
  { to: '/admin/finances', icon: FiTrendingUp, label: 'Finances' },
  { to: '/admin/clients', icon: FiUsers, label: 'Clients', badge: 25 },
  { to: '/admin/parametres', icon: FiSettings, label: 'Paramètres' },
];

export default function AdminSidebar({ collapsed, open, onToggleCollapse, onClose }) {
  const { adminUser, logout } = useAdmin();
  const location = useLocation();

  const sidebarContent = (
    <div
      style={{
        width: collapsed ? '64px' : '260px',
        height: '100vh',
        background: 'var(--c-gray-900)',
        color: 'var(--c-white)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '16px 0' : '24px 20px',
          textAlign: collapsed ? 'center' : 'left',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          minHeight: collapsed ? '64px' : '88px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: collapsed ? 'center' : 'flex-start',
        }}
      >
        <div style={{ fontSize: collapsed ? '16px' : '22px', fontWeight: 800, letterSpacing: '1px', lineHeight: 1 }}>
          {collapsed ? 'C' : 'CHICKS'}
        </div>
        {!collapsed && (
          <div style={{ fontSize: '11px', color: 'var(--c-yellow)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: 2 }}>
            Admin Panel
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const isActive = item.to === location.pathname || (item.to !== '/admin/dashboard' && location.pathname.startsWith(item.to));
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? '0' : '12px',
                padding: collapsed ? '14px 0' : '12px 20px',
                textDecoration: 'none',
                color: isActive ? 'var(--c-yellow)' : 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                borderLeft: isActive ? '3px solid var(--c-yellow)' : '3px solid transparent',
                background: isActive ? 'rgba(245,200,66,0.15)' : 'transparent',
                justifyContent: collapsed ? 'center' : 'flex-start',
                position: 'relative',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }
              }}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge != null && (
                <span
                  style={{
                    marginLeft: 'auto',
                    background: item.badgeColor === 'orange' ? 'var(--c-orange)' : 'var(--c-yellow)',
                    color: item.badgeColor === 'orange' ? '#fff' : 'var(--c-gray-900)',
                    fontSize: '11px',
                    fontWeight: 700,
                    minWidth: '20px',
                    height: '20px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 6px',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      {!collapsed && (
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--c-yellow)',
              color: 'var(--c-gray-900)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '13px',
              flexShrink: 0,
            }}
          >
            {adminUser?.avatar || 'RC'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {adminUser?.name || 'Admin'}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
              {adminUser?.role || ''}
            </div>
          </div>
          <button
            onClick={logout}
            title="Déconnexion"
            style={{
              color: 'rgba(255,255,255,0.4)',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            <FiLogOut size={18} />
          </button>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        style={{
          position: 'absolute',
          bottom: collapsed ? '12px' : '76px',
          right: collapsed ? '50%' : '12px',
          transform: collapsed ? 'translateX(50%)' : 'none',
          color: 'rgba(255,255,255,0.3)',
          padding: '6px',
          borderRadius: '6px',
          display: 'flex',
          transition: 'color 0.15s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
      >
        <FiChevronsLeft size={18} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div style={{ position: 'fixed', left: 0, top: 0, zIndex: 100, display: 'none' }} className="sidebar-desktop">
        {sidebarContent}
      </div>
      {/* Mobile overlay */}
      <div style={{ position: 'fixed', left: 0, top: 0, zIndex: 100, display: 'none' }} className="sidebar-mobile">
        {sidebarContent}
      </div>
      <style>{`
        @media (min-width: 768px) {
          .sidebar-desktop { display: block; }
          .sidebar-mobile { display: none; }
        }
        @media (max-width: 767px) {
          .sidebar-desktop { display: none; }
          .sidebar-mobile { display: ${open ? 'block' : 'none'}; }
        }
      `}</style>
    </>
  );
}
