function TimeFormatter(time: number) {
  return [
    Math.floor(time / 3600),
    Math.floor((time % 3600) / 60),
    Math.floor((time % 3600) % 60),
  ];
}

TimeFormatter.reduce = (acc: string, value: number) => {
  if (acc.length === 0) {
    return value.toString();
  } else {
    return `${acc}:${value.toString().padStart(2, '0')}`;
  }
};

export function Time(seconds: number): string {
  if (isNaN(seconds)) {
    return '0:00';
  }

  const time = TimeFormatter(seconds);
  const result = time
    .slice(time.findIndex((value) => value !== 0))
    .reduce(TimeFormatter.reduce, '');
  if (result.length < 3) {
    return `0:${result.padStart(2, '0')}`;
  } else {
    return result;
  }
}
