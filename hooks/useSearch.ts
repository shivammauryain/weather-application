"use client";

import { useState, useEffect } from 'react';

export default function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!query) return setResults([]);
      fetch(`/api/search?q=${encodeURIComponent(query)}`).then((r) => r.json()).then(setResults).catch(() => setResults([]));
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  return { query, setQuery, results };
}
