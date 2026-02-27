export async function geocodeCity(query: string, country = 'IN') {
  const KEY = process.env.OPENWEATHERMAP_API_KEY;
  const q = country ? `${query},${country}` : query;
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding failed');
  return res.json();
}
