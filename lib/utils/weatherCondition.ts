export type ConditionMap = {
  [key: string]: { label: string; icon: string };
};

export const conditionMap: ConditionMap = {
  Clear: { label: 'Clear', icon: 'WiDaySunny' },
  Clouds: { label: 'Cloudy', icon: 'WiCloud' },
  Rain: { label: 'Rain', icon: 'WiRain' },
  Drizzle: { label: 'Drizzle', icon: 'WiSprinkle' },
  Thunderstorm: { label: 'Storm', icon: 'WiThunderstorm' },
  Snow: { label: 'Snow', icon: 'WiSnow' },
  Mist: { label: 'Mist', icon: 'WiFog' },
};

export function mapCondition(main: string) {
  return conditionMap[main] ?? { label: main, icon: 'WiCloud' };
}
