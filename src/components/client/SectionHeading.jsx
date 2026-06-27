import { Link } from 'react-router-dom';

export default function SectionHeading({ title, subtitle, linkText, linkTo }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      marginBottom: 32, flexWrap: 'wrap', gap: 12,
    }}
    className="section-heading"
    >
      <style>{`@media (max-width: 480px) { .section-heading { flex-direction: column; align-items: flex-start; } }`}</style>
      <div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 'var(--text-xl)',
          color: 'var(--c-gray-900)',
        }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--c-gray-500)', marginTop: 4 }}>
            {subtitle}
          </p>
        )}
      </div>
      {linkText && linkTo && (
        <Link
          to={linkTo}
          style={{
            fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-yellow-deep)',
            whiteSpace: 'nowrap', transition: 'color 0.2s',
          }}
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
