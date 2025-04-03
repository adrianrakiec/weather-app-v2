const directions = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
];

export const getWindDirection = (windDeg: number) => {
  const index = Math.round(windDeg / 22.5) % 16;
  return directions[index];
};
