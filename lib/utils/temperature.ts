export function cToF(c: number): number {
  return +(c * 9) / 5 + 32;
}

export function fToC(f: number): number {
  return +((f - 32) * 5) / 9;
}
