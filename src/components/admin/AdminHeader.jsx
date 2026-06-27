import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiBell, FiChevronDown, FiMenu } from 'react-icons/fi';
import { useAdmin } from '../../context/AdminContext';
import AdminBreadcrumb from './AdminBreadcrumb';

export default function AdminHeader({ onMenuClick }) {
  const { adminUser } = useAdmin();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header
      style={{
        height: '64px',
        background: 'var(--c-white)',
        borderBottom: '1px solid var(--c-gray-100)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '12px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        style={{ display: 'none', padding: '6px', color: 'var(--c-gray-700)', marginRight: '8px' }}
        className="mobile-menu-btn"
      >
        <FiMenu size={22} />
      </button>

      {/* Breadcrumb */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <AdminBreadcrumb />
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button
          style={{
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--c-gray-500)',
            display: 'flex',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; e.currentTarget.style.color = 'var(--c-gray-900)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
        >
          <FiSearch size={20} />
        </button>

        <button
          style={{
            padding: '8px',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--c-gray-500)',
            display: 'flex',
            position: 'relative',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; e.currentTarget.style.color = 'var(--c-gray-900)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-gray-500)'; }}
        >
          <FiBell size={20} />
          <span
            style={{
              position: 'absolute', top: '4px', right: '4px',
              width: '16px', height: '16px', borderRadius: '50%',
              background: 'var(--c-orange)', color: '#fff',
              fontSize: '9px', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid var(--c-white)',
            }}
          >
            3
          </span>
        </button>

        {/* User chip */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((v) => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 10px', borderRadius: 'var(--radius-pill)',
              background: 'transparent', transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-gray-50)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div
              style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'var(--c-yellow)', color: 'var(--c-gray-900)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '12px',
              }}
            >
              {adminUser?.avatar || 'RC'}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--c-gray-900)', whiteSpace: 'nowrap' }}>
              {adminUser?.name?.split(' ')[0] || 'Admin'}
            </span>
            <FiChevronDown size={16} color="var(--c-gray-500)" />
          </button>

          {showDropdown && (
            <div
              style={{
                position: 'absolute', right: 0, top: '100%', marginTop: '4px',
                background: 'var(--c-white)', borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-modal)', minWidth: '200px',
                padding: '6px', zIndex: 200,
              }}
            >
              <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--c-gray-100)' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-gray-900)' }}>{adminUser?.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--c-gray-500)' }}>{adminUser?.email}</div>
              </div>
              <button
                style={{ width: '100%', textAlign: 'left', padding: '8px 12px', fontSize: '13px', color: 'var(--c-red)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--c-red-pale)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <FiLogOut size={16} /> Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function FiLogOut({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
