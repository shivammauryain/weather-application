import { NextResponse } from 'next/server';
import { searchCities } from '@/lib/api/openweather';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get('q') ?? '';
    if (!q) return NextResponse.json([], { status: 200 });
    const results = await searchCities(q, 'IN');
    return NextResponse.json(results, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'unknown' }, { status: 500 });
  }
}
