export const convertMilliseconds = (milliseconds: number): string => {
  const msPerSecond = 1000;
  const msPerMinute = msPerSecond * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  if (milliseconds < msPerSecond) {
    return `${milliseconds} millisecond${milliseconds !== 1 ? 's' : ''}`;
  }
  if (milliseconds < msPerMinute) {
    const seconds = Math.floor(milliseconds / msPerSecond);
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
  if (milliseconds < msPerHour) {
    const minutes = Math.floor(milliseconds / msPerMinute);
    const remainingSeconds = Math.floor((milliseconds % msPerMinute) / msPerSecond);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}, ${remainingSeconds} second${
      remainingSeconds !== 1 ? 's' : ''
    }`;
  }
  if (milliseconds < msPerDay) {
    const hours = Math.floor(milliseconds / msPerHour);
    const remainingMinutes = Math.floor((milliseconds % msPerHour) / msPerMinute);
    const remainingSeconds = Math.floor((milliseconds % msPerMinute) / msPerSecond);
    return `${hours} hour${hours !== 1 ? 's' : ''}, ${remainingMinutes} minute${
      remainingMinutes !== 1 ? 's' : ''
    }, ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  }
  {
    const days = Math.floor(milliseconds / msPerDay);
    const remainingHours = Math.floor((milliseconds % msPerDay) / msPerHour);
    const remainingMinutes = Math.floor((milliseconds % msPerHour) / msPerMinute);
    const remainingSeconds = Math.floor((milliseconds % msPerMinute) / msPerSecond);
    return `${days} day${days !== 1 ? 's' : ''}, ${remainingHours} hour${
      remainingHours !== 1 ? 's' : ''
    }, ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}, ${remainingSeconds} second${
      remainingSeconds !== 1 ? 's' : ''
    }`;
  }
};
