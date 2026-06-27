import { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

export default function DataTable({
  columns,
  data,
  onRowClick,
  selectable,
  pagination,
  sortBy,
  sortDir,
  onSort,
}) {
  const [selectedRows, setSelectedRows] = useState([]);

  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, i) => i));
    }
  };

  const toggleRow = (idx) => {
    setSelectedRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleSort = (key) => {
    if (!onSort) return;
    if (sortBy === key) {
      onSort(key, sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(key, 'asc');
    }
  };

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          background: 'var(--c-white)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-card)',
          padding: '60px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '40px', color: 'var(--c-gray-300)', marginBottom: '12px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
        </div>
        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--c-gray-700)', marginBottom: '4px' }}>Aucune donnée</div>
        <div style={{ fontSize: '13px', color: 'var(--c-gray-500)' }}>Aucun résultat trouvé pour cette recherche.</div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'var(--c-white)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--c-gray-100)' }}>
              {selectable && (
                <th style={{ width: '40px', padding: '12px 8px 12px 16px' }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => { if (el) el.indeterminate = someSelected; }}
                    onChange={toggleAll}
                    style={{ accentColor: 'var(--c-yellow)', cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--c-gray-500)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    cursor: col.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    top: 0,
                    background: 'var(--c-white)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {col.label}
                    {col.sortable && sortBy === col.key && (
                      sortDir === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={row.id || idx}
                onClick={() => onRowClick && onRowClick(row)}
                style={{
                  borderBottom: '1px solid var(--c-gray-50)',
                  background: idx % 2 === 0 ? 'var(--c-white)' : 'var(--c-gray-50)',
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-yellow-pale)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? 'var(--c-white)' : 'var(--c-gray-50)'; }}
              >
                {selectable && (
                  <td style={{ padding: '10px 8px 10px 16px', width: '40px' }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(idx)}
                      onChange={() => toggleRow(idx)}
                      style={{ accentColor: 'var(--c-yellow)', cursor: 'pointer', width: '16px', height: '16px' }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding: '10px 16px',
                      fontSize: '13px',
                      color: 'var(--c-gray-700)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderTop: '1px solid var(--c-gray-100)',
            fontSize: '12px',
            color: 'var(--c-gray-500)',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span>{selectedRows.length > 0 ? `${selectedRows.length} sélectionné(s)` : ''}</span>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .data-table-wrap { overflow-x: auto; }
          .data-table-wrap table { min-width: 700px; }
          .data-table-wrap td:first-child,
          .data-table-wrap th:first-child {
            position: sticky; left: 0; z-index: 2;
          }
        }
      `}</style>
    </div>
  );
}
