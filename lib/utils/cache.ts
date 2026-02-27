type CacheEntry<T> = { value: T; expiry: number };

const inMemory = new Map<string, CacheEntry<any>>();

export function setCache<T>(key: string, value: T, ttl = 60_000) {
  inMemory.set(key, { value, expiry: Date.now() + ttl });
}

export function getCache<T>(key: string): T | null {
  const e = inMemory.get(key);
  if (!e) return null;
  if (Date.now() > e.expiry) {
    inMemory.delete(key);
    return null;
  }
  return e.value as T;
}
