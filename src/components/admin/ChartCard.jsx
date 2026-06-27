export default function ChartCard({ title, children, controls }) {
  return (
    <div
      style={{
        background: 'var(--c-white)',
        borderRadius: 'var(--radius-md)',
        padding: '20px 24px',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          gap: '12px',
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--c-gray-900)', margin: 0 }}>
          {title}
        </h3>
        {controls && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>{controls}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
