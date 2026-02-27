"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '@/store/hooks';

export default function MapLeaflet() {
  const favorites = useAppSelector((s) => s.favorites.cities);
  const cities = useAppSelector((s) => s.weather.cities);

  const center = (() => {
    // center on first favorite with coords, otherwise fallback
    for (const name of favorites) {
      const w = cities[name];
      if (w?.coord) return [w.coord.lat, w.coord.lon] as [number, number];
    }
    // fallback: center of India
    return [22.5937, 78.9629] as [number, number];
  })();

  return (
    <div style={{ height: 240 }} className="rounded-md overflow-hidden">
      <MapContainer center={center} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {favorites.map((name) => {
          const w = cities[name];
          if (!w?.coord) return null;
          return (
            <Marker key={name} position={[w.coord.lat, w.coord.lon]}>
              <Popup>
                <div className="text-sm font-semibold">{name}</div>
                <div className="text-[--text-muted]">{Math.round(w.temp)}° • {w.condition}</div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
