function ReleaseDateFormatter(date: Date) {
  const now = Date.now();
  const elapsed = new Date(now - Number(date));
  const epoch = new Date(0);
  const entries = Object.entries({
    year: elapsed.getUTCFullYear() - epoch.getUTCFullYear(),
    month: elapsed.getUTCMonth() - epoch.getUTCMonth(),
    week: Math.floor((elapsed.getUTCDate() - epoch.getUTCDate()) / 7),
    day: elapsed.getUTCDate() - epoch.getUTCDate(),
    hour: elapsed.getUTCHours() - epoch.getUTCHours(),
    minute: elapsed.getUTCMinutes() - epoch.getUTCMinutes(),
    second: elapsed.getUTCSeconds() - epoch.getUTCSeconds(),
  });
  return entries[entries.findIndex((entry) => entry[1] !== 0)];
}

ReleaseDateFormatter.value = (entry: [string, number]) => Math.abs(entry[1]);

ReleaseDateFormatter.unit = (entry: [string, number]) =>
  Math.abs(entry[1]) === 1 ? entry[0] : `${entry[0]}s`;

ReleaseDateFormatter.suffix = (entry: [string, number]) =>
  entry[1] < 0 ? 'from now' : 'ago';

export function ReleaseDate(date: Date | string | number): string {
  const formatter = ReleaseDateFormatter(new Date(date));
  if (typeof formatter === 'undefined')
    throw new Error('Release Date could not be formatted.');
  return [
    ReleaseDateFormatter.value(formatter),
    ReleaseDateFormatter.unit(formatter),
    ReleaseDateFormatter.suffix(formatter),
  ].join(' ');
}

export function FullReleaseDate(
  date: Date | string | number,
  locale?: string
): string {
  return new Date(date).toLocaleDateString(locale ?? 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
