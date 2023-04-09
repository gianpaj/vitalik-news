export const convertMilliseconds = (milliseconds: number): string => {
  const {
    msPerSecond = 1000,
    msPerMinute = msPerSecond * 60,
    msPerHour = msPerMinute * 60,
    msPerDay = msPerHour * 24,
  } = {};

  const strings = {
    millisecond: 'millisecond',
    second: 'second',
    minute: 'minute',
    hour: 'hour',
    day: 'day',
    s: 's', //helper function for pluralization
  };

  const pluralize = (num: number, str: string) => `${num} ${str}${num !== 1 ? strings.s : ''}`;

  if (milliseconds < msPerSecond) {
    return pluralize(Math.floor(milliseconds), strings.millisecond);
  }
  if (milliseconds < msPerMinute) {
    const seconds = Math.floor(milliseconds / msPerSecond);
    return pluralize(seconds, strings.second);
  }
  if (milliseconds < msPerHour) {
    const minutes = Math.floor(milliseconds / msPerMinute);
    const remainingSeconds = Math.floor((milliseconds % msPerMinute) / msPerSecond);
    return `${pluralize(minutes, strings.minute)}, ${pluralize(remainingSeconds, strings.second)}`;
  }
  if (milliseconds < msPerDay) {
    const hours = Math.floor(milliseconds / msPerHour);
    const remainingMinutes = Math.floor((milliseconds % msPerHour) / msPerMinute);
    const remainingSeconds = Math.floor((milliseconds % msPerMinute) / msPerSecond);
    return `${pluralize(hours, strings.hour)}, ${pluralize(remainingMinutes, strings.minute)}, ${pluralize(
      remainingSeconds,
      strings.second,
    )}`;
  }

  const days = Math.floor(milliseconds / msPerDay);
  const remainingHours = Math.floor((milliseconds % msPerDay) / msPerHour);
  const remainingMinutes = Math.floor((milliseconds % msPerHour) / msPerMinute);
  const remainingSeconds = Math.floor((milliseconds % msPerMinute) / msPerSecond);
  return `${pluralize(days, strings.day)}, ${pluralize(remainingHours, strings.hour)}, ${pluralize(
    remainingMinutes,
    strings.minute,
  )}, ${pluralize(remainingSeconds, strings.second)}`;
};
