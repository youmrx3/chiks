import { Link } from 'react-router-dom';

export default function BreadCrumb({ items = [] }) {
  return (
    <nav aria-label="Fil d'Ariane" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && (
              <span style={{ color: 'var(--c-gray-300)', fontSize: 12, userSelect: 'none' }}>›</span>
            )}
            {isLast || !item.link ? (
              <span style={{
                fontSize: 'var(--text-xs)', fontWeight: isLast ? 600 : 400,
                color: isLast ? 'var(--c-gray-900)' : 'var(--c-gray-500)',
              }}>
                {item.label}
              </span>
            ) : (
              <Link
                to={item.link}
                style={{
                  fontSize: 'var(--text-xs)', fontWeight: 500,
                  color: 'var(--c-gray-500)', transition: 'color 0.2s',
                }}
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
