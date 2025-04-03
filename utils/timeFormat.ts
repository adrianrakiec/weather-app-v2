export const timeFormat = (
  timeInSec: number,
  timezone: number,
  showSeconds = false
) => {
  const utcDate = new Date((timeInSec + timezone) * 1000);
  const timeParts = utcDate.toUTCString().split(' ')[4].split(':');

  return showSeconds ? timeParts.join(':') : `${timeParts[0]}:${timeParts[1]}`;
};

export const getDayName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};
