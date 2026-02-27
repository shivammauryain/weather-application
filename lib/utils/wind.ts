export function degToCardinal(deg: number): string {
  const directions = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  const idx = Math.round((deg % 360) / 22.5) % 16;
  return directions[idx] ?? 'N';
}

export function msToKmh(ms: number): number {
  return Math.round(ms * 3.6);
}
