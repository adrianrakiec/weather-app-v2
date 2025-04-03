import type { ForecastResult, List } from '../types/forecast';

export const getDailyWeatherInfo = (
  forecastArray: List[],
  timezone: number
): ForecastResult[] => {
  const days: Record<
    string,
    {
      time: string;
      temperature: number;
      icon: string;
      windSpeed: number;
      windDeg: number;
    }[]
  > = {};

  forecastArray.forEach((item) => {
    const localTime = new Date((item.dt + timezone) * 1000);
    const date = localTime.toISOString().split('T')[0];
    const time = localTime.toISOString().split('T')[1].substring(0, 5);

    if (!days[date]) {
      days[date] = [];
    }

    days[date].push({
      time,
      temperature: item.main.temp,
      icon: item.weather[0].icon,
      windSpeed: item.wind.speed,
      windDeg: item.wind.deg,
    });
  });

  return Object.entries(days).map(([date, temperatures]) => ({
    date,
    temperatures,
  }));
};

export const getDayNightTemperatures = (
  temperatures: {
    time: string;
    temperature: number;
    icon: string;
  }[]
) => {
  const dayTemps = temperatures.filter((entry) => {
    const hour = parseInt(entry.time.split(':')[0]);
    return hour >= 8 && hour < 16;
  });

  const nightTemps = temperatures.filter((entry) => {
    const hour = parseInt(entry.time.split(':')[0]);
    return hour >= 18 || hour < 6;
  });

  const tempDay = dayTemps.length
    ? Math.max(...dayTemps.map((e) => e.temperature))
    : 0;
  const tempNight = nightTemps.length
    ? Math.min(...nightTemps.map((e) => e.temperature))
    : 0;

  return `${Math.round(tempDay)}° / ${Math.round(tempNight)}°`;
};
