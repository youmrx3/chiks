export default function getStockStatus(qty) {
  if (qty === 0) {
    return { label: 'Rupture de stock', color: 'var(--c-red)', bg: 'var(--c-red-pale)', textColor: 'var(--c-red-deep)' };
  }
  if (qty < 10) {
    return { label: 'Stock bas', color: 'var(--c-orange)', bg: 'var(--c-orange-pale)', textColor: 'var(--c-orange-deep)' };
  }
  return { label: 'En stock', color: 'var(--c-green)', bg: 'var(--c-green-pale)', textColor: 'var(--c-green-deep)' };
}
