export function Class(
  ...classes: (string | false | 0 | null | undefined)[]
): string | undefined {
  return classes.filter(Boolean).join(' ') || undefined;
}
