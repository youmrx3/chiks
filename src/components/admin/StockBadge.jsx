export default function StockBadge({ qty }) {
  if (qty == null) return null;

  if (qty >= 10) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 10px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--c-green-pale)',
          color: 'var(--c-green-deep)',
          fontSize: '12px',
          fontWeight: 600,
          gap: '4px',
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-green)' }} />
        En stock ({qty})
      </span>
    );
  }

  if (qty > 0 && qty < 10) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 10px',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--c-orange-pale)',
          color: 'var(--c-orange-deep)',
          fontSize: '12px',
          fontWeight: 600,
          gap: '4px',
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-orange)' }} />
        Stock bas ({qty})
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--c-red-pale)',
        color: 'var(--c-red-deep)',
        fontSize: '12px',
        fontWeight: 600,
        gap: '4px',
      }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-red)' }} />
      Rupture
    </span>
  );
}
