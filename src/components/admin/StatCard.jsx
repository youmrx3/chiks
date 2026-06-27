import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

export default function StatCard({ icon: Icon, label, value, change, changeType, borderColor, subtitle, onClick }) {
  const changeColors = {
    up: { text: 'var(--c-green)', bg: 'var(--c-green-pale)' },
    down: { text: 'var(--c-red)', bg: 'var(--c-red-pale)' },
    neutral: { text: 'var(--c-gray-500)', bg: 'var(--c-gray-50)' },
  };
  const cc = changeColors[changeType] || changeColors.neutral;

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: 'var(--c-white)',
        borderRadius: 'var(--radius-md)',
        padding: '20px 24px',
        borderLeft: `4px solid ${borderColor || 'var(--c-yellow)'}`,
        boxShadow: 'var(--shadow-card)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s, transform 0.2s',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = 'var(--shadow-card)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: `${borderColor || 'var(--c-yellow)'}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: borderColor || 'var(--c-yellow)',
          flexShrink: 0,
        }}
      >
        <Icon size={20} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '12px', color: 'var(--c-gray-500)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--c-gray-900)', marginTop: '2px', lineHeight: 1.2 }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: '12px', color: 'var(--c-gray-500)', marginTop: '4px' }}>
            {subtitle}
          </div>
        )}
      </div>
      {change != null && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            padding: '4px 8px',
            borderRadius: 'var(--radius-pill)',
            background: cc.bg,
            color: cc.text,
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            marginTop: '4px',
          }}
        >
          {changeType === 'up' && <FiArrowUpRight size={14} />}
          {changeType === 'down' && <FiArrowDownRight size={14} />}
          {change}
        </div>
      )}
    </div>
  );
}
