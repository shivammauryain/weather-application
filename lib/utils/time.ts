export function formatHour(timestamp: number, locale = 'en-US') {
  const d = new Date(timestamp);
  return d.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
}

export function formatDateShort(timestamp: number, locale = 'en-US') {
  const d = new Date(timestamp);
  return d.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' });
}
