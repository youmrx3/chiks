import { FiDownload } from 'react-icons/fi';

export default function ExportButton({ onClick, label = 'Exporter CSV' }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    const headers = ['ID', 'Nom', 'Catégorie', 'Prix', 'Stock'];
    const rows = [
      ['PRD-001', 'Combinaison Tricot Ours', 'Knitwear', '3200', '16'],
      ['PRD-002', 'Pull Col Roulé Rayé', 'Knitwear', '2800', '16'],
      ['PRD-003', 'Cardigan Tresse Pois', 'Knitwear', '3500', '12'],
    ];
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--c-gray-100)',
        background: 'transparent',
        color: 'var(--c-gray-700)',
        fontSize: '13px',
        fontWeight: 600,
        transition: 'all 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--c-gray-50)';
        e.currentTarget.style.borderColor = 'var(--c-gray-300)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.borderColor = 'var(--c-gray-100)';
      }}
    >
      <FiDownload size={16} />
      {label}
    </button>
  );
}
