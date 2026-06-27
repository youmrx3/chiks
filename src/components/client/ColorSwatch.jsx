export default function ColorSwatch({ color, name, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      title={name}
      aria-label={name}
      style={{
        width: 30, height: 30, borderRadius: '50%',
        background: color,
        border: selected ? '3px solid var(--c-yellow)' : `2px solid ${color === '#FFFFFF' ? 'var(--c-gray-100)' : 'transparent'}`,
        boxShadow: selected ? '0 0 0 2px var(--c-white), 0 0 0 4px var(--c-yellow)' : '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer', flexShrink: 0,
        transition: 'transform 0.2s, box-shadow 0.2s',
        transform: selected ? 'scale(1.1)' : 'scale(1)',
      }}
    />
  );
}
