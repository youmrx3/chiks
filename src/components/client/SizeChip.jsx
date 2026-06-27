export default function SizeChip({ size, selected, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '6px 14px', borderRadius: 'var(--radius-pill)',
        border: `1px solid ${selected ? 'var(--c-yellow)' : disabled ? 'var(--c-gray-50)' : 'var(--c-gray-100)'}`,
        background: selected ? 'var(--c-yellow-pale)' : disabled ? 'var(--c-gray-50)' : 'var(--c-white)',
        fontSize: 11, fontWeight: 600,
        color: disabled ? 'var(--c-gray-300)' : selected ? 'var(--c-yellow-deep)' : 'var(--c-gray-700)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        textDecoration: disabled ? 'line-through' : 'none',
      }}
    >
      {size}
    </button>
  );
}
