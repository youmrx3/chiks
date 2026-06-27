export default function formatCurrency(amount) {
  if (amount === null || amount === undefined) return '— DA';
  const formatted = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} DA`;
}
