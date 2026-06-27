import { useCallback, useRef } from 'react';
import formatCurrency from '../../utils/formatCurrency';

export default function PriceRangeSlider({ min = 0, max = 10000, valueMin, valueMax, onChangeMin, onChangeMax }) {
  const trackRef = useRef(null);

  const getPercent = (v) => ((v - min) / (max - min)) * 100;

  const handleThumb = useCallback((e, isMin) => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = x / rect.width;
    const value = Math.round((min + pct * (max - min)) / 100) * 100;
    if (isMin) {
      const newMin = Math.min(value, valueMax - 100);
      if (onChangeMin) onChangeMin(newMin);
    } else {
      const newMax = Math.max(value, valueMin + 100);
      if (onChangeMax) onChangeMax(newMax);
    }
  }, [min, max, valueMin, valueMax, onChangeMin, onChangeMax]);

  const minPct = getPercent(valueMin);
  const maxPct = getPercent(valueMax);

  return (
    <div>
      <div
        ref={trackRef}
        style={{ position: 'relative', height: 4, background: 'var(--c-gray-100)', borderRadius: 2, margin: '16px 0', cursor: 'pointer' }}
        onClick={(e) => {
          const rect = trackRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const mid = rect.width / 2;
          handleThumb(e, x < mid);
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: `${minPct}%`, width: `${maxPct - minPct}%`, height: '100%',
          background: 'var(--c-yellow)', borderRadius: 2,
        }} />
        <div
          onMouseDown={(e) => {
            const onMove = (ev) => handleThumb(ev, true);
            const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
          }}
          onTouchStart={(e) => {
            const onMove = (ev) => handleThumb(ev.touches[0], true);
            const onUp = () => { document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onUp); };
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', onUp);
          }}
          style={{
            position: 'absolute', top: '50%', left: `${minPct}%`, width: 20, height: 20,
            borderRadius: '50%', background: 'var(--c-yellow)', border: '3px solid var(--c-white)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transform: 'translate(-50%, -50%)',
            cursor: 'grab', zIndex: 2,
          }}
        />
        <div
          onMouseDown={(e) => {
            const onMove = (ev) => handleThumb(ev, false);
            const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
          }}
          onTouchStart={(e) => {
            const onMove = (ev) => handleThumb(ev.touches[0], false);
            const onUp = () => { document.removeEventListener('touchmove', onMove); document.removeEventListener('touchend', onUp); };
            document.addEventListener('touchmove', onMove);
            document.addEventListener('touchend', onUp);
          }}
          style={{
            position: 'absolute', top: '50%', left: `${maxPct}%`, width: 20, height: 20,
            borderRadius: '50%', background: 'var(--c-yellow)', border: '3px solid var(--c-white)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transform: 'translate(-50%, -50%)',
            cursor: 'grab', zIndex: 2,
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-gray-700)' }}>{formatCurrency(valueMin)}</span>
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--c-gray-700)' }}>{formatCurrency(valueMax)}</span>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="number"
          value={valueMin}
          onChange={(e) => { const v = Math.min(Number(e.target.value), valueMax - 100); if (onChangeMin) onChangeMin(Math.max(min, v)); }}
          style={{
            flex: 1, height: 36, padding: '0 8px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--c-gray-100)', fontSize: 11, textAlign: 'center',
          }}
        />
        <span style={{ display: 'flex', alignItems: 'center', color: 'var(--c-gray-500)', fontSize: 12 }}>—</span>
        <input
          type="number"
          value={valueMax}
          onChange={(e) => { const v = Math.max(Number(e.target.value), valueMin + 100); if (onChangeMax) onChangeMax(Math.min(max, v)); }}
          style={{
            flex: 1, height: 36, padding: '0 8px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--c-gray-100)', fontSize: 11, textAlign: 'center',
          }}
        />
      </div>
    </div>
  );
}
