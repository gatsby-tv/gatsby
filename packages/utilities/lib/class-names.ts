export function classNames(
  ...classes: (string | boolean | undefined)[]
): string | undefined {
  return classes.filter(Boolean).join(' ') || undefined;
}
