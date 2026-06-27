import StarRating from './StarRating';
import { formatDateShort } from '../../utils/formatDate';

export default function ReviewCard({ review }) {
  return (
    <div style={{
      background: 'var(--c-white)', borderRadius: 'var(--radius-md)',
      padding: 20, boxShadow: 'var(--shadow-card)',
    }}>
      <StarRating rating={review.rating} />
      <p style={{
        fontSize: 'var(--text-sm)', color: 'var(--c-gray-700)',
        lineHeight: 1.7, marginTop: 10, fontStyle: 'italic',
      }}>
        "{review.comment}"
      </p>
      <div style={{ borderTop: '1px solid var(--c-gray-50)', marginTop: 14, paddingTop: 14 }}>
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--c-gray-900)' }}>
          {review.author}
        </p>
        <p style={{ fontSize: 11, color: 'var(--c-gray-500)', marginTop: 2 }}>
          {review.wilaya} · {formatDateShort(review.date)}
        </p>
      </div>
    </div>
  );
}
