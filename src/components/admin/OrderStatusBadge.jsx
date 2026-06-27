const statusConfig = {
  pending: { label: 'En attente', bg: 'var(--c-gray-50)', color: 'var(--c-gray-700)', dot: 'var(--c-gray-500)' },
  confirmed: { label: 'Confirmée', bg: 'var(--c-blue-pale)', color: 'var(--c-blue-deep)', dot: 'var(--c-blue)' },
  processing: { label: 'En traitement', bg: 'var(--c-yellow-pale)', color: 'var(--c-yellow-deep)', dot: 'var(--c-yellow)' },
  shipped: { label: 'Expédiée', bg: 'var(--c-mint-pale)', color: 'var(--c-mint-deep)', dot: 'var(--c-mint)' },
  delivered: { label: 'Livrée', bg: 'var(--c-green-pale)', color: 'var(--c-green-deep)', dot: 'var(--c-green)' },
  cancelled: { label: 'Annulée', bg: 'var(--c-red-pale)', color: 'var(--c-red-deep)', dot: 'var(--c-red)' },
  returned: { label: 'Retournée', bg: 'var(--c-orange-pale)', color: 'var(--c-orange-deep)', dot: 'var(--c-orange)' },
};

export default function OrderStatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        background: config.bg,
        color: config.color,
        fontSize: '12px',
        fontWeight: 600,
      }}
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.dot }} />
      {config.label}
    </span>
  );
}
