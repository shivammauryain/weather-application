import { CurrentWeatherNormalized, ForecastNormalized } from './types';

const OWM_BASE = 'https://api.openweathermap.org';
const KEY = process.env.OPENWEATHERMAP_API_KEY;

if (!KEY) {
  // allow build-time but warn during runtime
  // console.warn('OPENWEATHER_API_KEY not set');
}

async function safeFetch(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenWeather error: ${res.status}`);
  return res.json();
}

export async function getCurrentWeather(city: string): Promise<CurrentWeatherNormalized> {
  const url = `${OWM_BASE}/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${KEY}`;
  const json = await safeFetch(url);
  const normalized: CurrentWeatherNormalized = {
    name: json.name,
    sys: json.sys,
    temp: json.main?.temp,
    condition: json.weather?.[0]?.main ?? 'Unknown',
    humidity: json.main?.humidity,
    wind: { speed: json.wind?.speed, deg: json.wind?.deg },
    coord: json.coord,
  };
  return normalized;
}

export async function getHourlyForecast(city: string): Promise<ForecastNormalized> {
  const url = `${OWM_BASE}/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${KEY}`;
  const json = await safeFetch(url);
  // openweathermap 5-day/3-hour forecast -> convert to hourly points approx
  const hourly = (json.list || []).map((p: any) => ({ dt: p.dt * 1000, temp: p.main?.temp }));
  const normalized: ForecastNormalized = { city: json.city?.name ?? city, hourly };
  return normalized;
}

export async function get7DayForecastByCoords(lat: number, lon: number): Promise<ForecastNormalized> {
  const url = `${OWM_BASE}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current,alerts&units=metric&appid=${KEY}`;
  const json = await safeFetch(url);
  const hourly = (json.hourly || []).map((h: any) => ({ dt: h.dt * 1000, temp: h.temp }));
  const daily = (json.daily || []).map((d: any) => ({ dt: d.dt * 1000, temp: { min: d.temp.min, max: d.temp.max } }));
  return { city: '', hourly, daily };
}

export async function searchCities(query: string, country = 'IN') {
  const q = country ? `${query},${country}` : query;
  const url = `${OWM_BASE}/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=8&appid=${KEY}`;
  return safeFetch(url);
}
