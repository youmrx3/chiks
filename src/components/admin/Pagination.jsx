import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ currentPage, totalPages, totalItems, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ fontSize: '12px', color: 'var(--c-gray-500)' }}>
        Page {currentPage} sur {totalPages} ({totalItems} résultats)
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            color: currentPage <= 1 ? 'var(--c-gray-300)' : 'var(--c-gray-700)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            if (currentPage > 1) {
              e.currentTarget.style.background = 'var(--c-gray-50)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <FiChevronLeft size={16} />
          <span style={{ display: 'none' }} className="pagination-prev-text">Précédent</span>
        </button>

        {getPageNumbers().map((page, i) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${i}`}
                style={{
                  padding: '6px 8px',
                  fontSize: '13px',
                  color: 'var(--c-gray-500)',
                }}
              >
                ...
              </span>
            );
          }
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                minWidth: '34px',
                height: '34px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                background: isActive ? 'var(--c-yellow)' : 'transparent',
                color: isActive ? 'var(--c-gray-900)' : 'var(--c-gray-700)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--c-gray-50)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          style={{
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            color: currentPage >= totalPages ? 'var(--c-gray-300)' : 'var(--c-gray-700)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            if (currentPage < totalPages) {
              e.currentTarget.style.background = 'var(--c-gray-50)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span style={{ display: 'none' }} className="pagination-next-text">Suivant</span>
          <FiChevronRight size={16} />
        </button>
      </div>

      <style>{`
        @media (min-width: 480px) {
          .pagination-prev-text { display: inline !important; }
          .pagination-next-text { display: inline !important; }
        }
      `}</style>
    </div>
  );
}
