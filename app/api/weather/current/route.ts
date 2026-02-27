import { NextResponse } from 'next/server';
import { getCurrentWeather } from '@/lib/api/openweather';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const city = url.searchParams.get('city') ?? '';
    if (!city) return NextResponse.json({ error: 'city required' }, { status: 400 });
    const data = await getCurrentWeather(city);
    return NextResponse.json(data, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'unknown' }, { status: 500 });
  }
}
