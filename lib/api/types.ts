export interface CurrentWeatherNormalized {
  name: string;
  sys?: { country?: string };
  temp: number;
  condition: string;
  humidity?: number;
  wind?: { speed: number; deg: number };
  coord?: { lat: number; lon: number };
}

export interface ForecastHourlyPoint {
  dt: number;
  temp: number;
}

export interface ForecastNormalized {
  city: string;
  hourly: ForecastHourlyPoint[];
  daily?: Array<{ dt: number; temp: { min: number; max: number } }>;
}
