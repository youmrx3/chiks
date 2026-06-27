import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatDateShort(isoString) {
  if (!isoString) return '';
  try {
    return format(parseISO(isoString), 'dd MMM yyyy', { locale: fr });
  } catch {
    return isoString;
  }
}

export function formatDateLong(isoString) {
  if (!isoString) return '';
  try {
    return format(parseISO(isoString), "dd MMMM yyyy 'à' HH'h'mm", { locale: fr });
  } catch {
    return isoString;
  }
}

export function formatDateInput(isoString) {
  if (!isoString) return '';
  try {
    return format(parseISO(isoString), 'yyyy-MM-dd');
  } catch {
    return isoString;
  }
}

export function timeAgo(isoString) {
  if (!isoString) return '';
  try {
    return formatDistanceToNow(parseISO(isoString), { addSuffix: true, locale: fr });
  } catch {
    return isoString;
  }
}
