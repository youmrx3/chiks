import { useLocation, Link } from 'react-router-dom';

const labelMap = {
  dashboard: 'Tableau de bord',
  produits: 'Produits',
  nouveau: 'Nouveau produit',
  commandes: 'Commandes',
  inventaire: 'Inventaire',
  finances: 'Finances',
  clients: 'Clients',
  parametres: 'Paramètres',
};

export default function AdminBreadcrumb() {
  const location = useLocation();
  const segments = location.pathname.replace('/admin/', '').split('/').filter(Boolean);

  if (segments.length === 0) {
    return <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--c-gray-900)' }}>Tableau de bord</span>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
      <Link
        to="/admin/dashboard"
        style={{ fontSize: '13px', color: 'var(--c-gray-500)', textDecoration: 'none', transition: 'color 0.15s' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-yellow)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--c-gray-500)'}
      >
        Admin
      </Link>
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        const label = labelMap[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
        return (
          <span key={seg} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--c-gray-300)', fontSize: '12px' }}>/</span>
            {isLast ? (
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--c-gray-900)' }}>{label}</span>
            ) : (
              <Link
                to={`/admin/${segments.slice(0, i + 1).join('/')}`}
                style={{ fontSize: '13px', color: 'var(--c-gray-500)', textDecoration: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--c-yellow)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--c-gray-500)'}
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
