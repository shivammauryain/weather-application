import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const range = url.searchParams.get('range') ?? '7d';

    // Return synthetic analytics data for charts; replace with real aggregation later
    const barData = Array.from({ length: 12 }).map((_, i) => ({ name: `${i}`, value: Math.round(10 + Math.random() * 10) }));
    const comparative = {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      London: [16, 17, 15, 16, 18, 17, 19],
      NewYork: [22, 21, 20, 19, 22, 23, 24],
      Tokyo: [18, 19, 21, 20, 18, 22, 23],
    };

    const payload = {
      range,
      barData,
      comparative,
      regional: [
        { region: 'North America', temp: 18.4 },
        { region: 'Europe', temp: 14.2 },
        { region: 'Asia Pacific', temp: 22.1 },
        { region: 'South America', temp: 24.5 },
        { region: 'Australia', temp: 19.8 },
      ],
      wind: { current: 18, dominant: 'NW', data: [30, 20, 30, 24, 18, 26, 28, 22] },
    };

    return NextResponse.json(payload, { headers: { 'Cache-Control': 's-maxage=60' } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'unknown' }, { status: 500 });
  }
}
