import React from 'react';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiNightClear, WiThunderstorm, WiFog, WiSprinkle } from 'react-icons/wi';

export type WeatherIconName = 'Clear' | 'Clouds' | 'Rain' | 'Snow' | 'Night' | 'Thunderstorm' | 'Mist' | 'Drizzle' | string;

interface Props {
  name: WeatherIconName;
  size?: number;
  className?: string;
}

function WeatherIcon({ name, size = 40, className = '' }: Props) {
  const key = name as string;
  switch (key) {
    case 'Clear':
      return <WiDaySunny size={size} className={className} />;
    case 'Clouds':
      return <WiCloud size={size} className={className} />;
    case 'Rain':
      return <WiRain size={size} className={className} />;
    case 'Drizzle':
      return <WiSprinkle size={size} className={className} />;
    case 'Snow':
      return <WiSnow size={size} className={className} />;
    case 'Thunderstorm':
      return <WiThunderstorm size={size} className={className} />;
    case 'Mist':
      return <WiFog size={size} className={className} />;
    case 'Night':
      return <WiNightClear size={size} className={className} />;
    default:
      return <WiCloud size={size} className={className} />;
  }
}

export default React.memo(WeatherIcon);
