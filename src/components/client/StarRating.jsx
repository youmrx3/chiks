export default function StarRating({ rating = 0, count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ display: 'flex', gap: 1 }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.min(1, Math.max(0, rating - (star - 1)));
          return (
            <span
              key={star}
              style={{
                fontSize: 15, lineHeight: 1,
                color: 'transparent',
                background: `linear-gradient(90deg, var(--c-yellow) ${fill * 100}%, var(--c-gray-100) ${fill * 100}%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ★
            </span>
          );
        })}
      </div>
      {count !== undefined && count !== null && (
        <span style={{ fontSize: 12, color: 'var(--c-gray-500)' }}>({count} avis)</span>
      )}
    </div>
  );
}
