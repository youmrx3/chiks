import { useState } from 'react';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';

export default function FilterBar({ filters = [], onFilterChange, activeCount }) {
  const [values, setValues] = useState({});

  const handleChange = (key, val) => {
    const next = { ...values, [key]: val };
    setValues(next);
    if (onFilterChange) onFilterChange(next);
  };

  const clearAll = () => {
    setValues({});
    if (onFilterChange) onFilterChange({});
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        padding: '12px 16px',
        background: 'var(--c-white)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {filters.map((filter) => {
        if (filter.type === 'search') {
          return (
            <div key={filter.key} style={{ position: 'relative', flex: 1, minWidth: '180px', maxWidth: '320px' }}>
              <FiSearch
                size={16}
                style={{
                  position: 'absolute', left: '10px', top: '50%',
                  transform: 'translateY(-50%)', color: 'var(--c-gray-500)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder={filter.placeholder || 'Rechercher...'}
                value={values[filter.key] || ''}
                onChange={(e) => handleChange(filter.key, e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  border: '1px solid var(--c-gray-100)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  color: 'var(--c-gray-900)',
                  background: 'var(--c-gray-50)',
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--c-yellow)'; e.currentTarget.style.background = '#fff'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--c-gray-100)'; e.currentTarget.style.background = 'var(--c-gray-50)'; }}
              />
            </div>
          );
        }

        if (filter.type === 'select') {
          return (
            <select
              key={filter.key}
              value={values[filter.key] || ''}
              onChange={(e) => handleChange(filter.key, e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid var(--c-gray-100)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                color: 'var(--c-gray-900)',
                background: 'var(--c-gray-50)',
                minWidth: '130px',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--c-yellow)'; e.currentTarget.style.background = '#fff'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--c-gray-100)'; e.currentTarget.style.background = 'var(--c-gray-50)'; }}
            >
              <option value="">{filter.placeholder || 'Tous'}</option>
              {filter.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          );
        }

        if (filter.type === 'toggle') {
          return (
            <button
              key={filter.key}
              onClick={() => handleChange(filter.key, !values[filter.key])}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid',
                borderColor: values[filter.key] ? 'var(--c-yellow)' : 'var(--c-gray-100)',
                background: values[filter.key] ? 'var(--c-yellow-pale)' : 'var(--c-gray-50)',
                color: values[filter.key] ? 'var(--c-yellow-deep)' : 'var(--c-gray-700)',
                transition: 'all 0.15s',
              }}
            >
              {filter.label}
            </button>
          );
        }

        return null;
      })}

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            padding: '6px 12px', borderRadius: 'var(--radius-pill)',
            fontSize: '12px', fontWeight: 600,
            background: 'var(--c-gray-50)', color: 'var(--c-gray-700)',
            border: '1px solid var(--c-gray-100)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-red-pale)'; e.currentTarget.style.color = 'var(--c-red)'; e.currentTarget.style.borderColor = 'var(--c-red-pale)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--c-gray-50)'; e.currentTarget.style.color = 'var(--c-gray-700)'; e.currentTarget.style.borderColor = 'var(--c-gray-100)'; }}
        >
          <FiFilter size={14} />
          {activeCount} filtre{activeCount > 1 ? 's' : ''}
          <FiX size={14} />
        </button>
      )}
    </div>
  );
}
