function ValueFormatter(value: number) {
  const entries = Object.entries({
    Q: value / 1e15,
    T: value / 1e12,
    B: value / 1e9,
    M: value / 1e6,
    K: value / 1e3,
    '': Math.floor(value),
  }).map((entry) => [entry[0], ValueFormatter.round(entry[1])]);
  return entries[entries.findIndex((entry) => (entry[0] ? !!entry[1] : true))];
}

ValueFormatter.round = (value: number) => {
  if (value >= 100) {
    return +value.toPrecision(3);
  } else if (value >= 1) {
    return +value.toPrecision(2);
  } else {
    return 0;
  }
};

export function Value(num: number, unit?: string): string {
  const value = ValueFormatter(num);
  const suffix = !value[0] && value[1] === 1 ? unit : `${unit}s`;
  const result = value?.reverse().join('');
  return unit ? `${result} ${suffix}` : result;
}

export function FullValue(num: number, unit?: string): string {
  const value = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const suffix = num === 1 ? unit : `${unit}s`;
  return unit ? `${value} ${suffix}` : value;
}
