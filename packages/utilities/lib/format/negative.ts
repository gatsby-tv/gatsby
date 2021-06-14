export function Negative(size: undefined): undefined;
export function Negative(size: string | number): string | number;
export function Negative(size: (string | number)[]): (string | number)[];
export function Negative(size: any): any {
  if (typeof size === 'undefined') {
    return undefined;
  } else if (typeof size === 'string') {
    return size[0] === '-' ? size.slice(1) : size === '0' ? size : `-${size}`;
  } else if (typeof size === 'object') {
    return size.map((item: string) =>
      item[0] === '-' ? item.slice(1) : item === '0' ? item : `-${item}`
    );
  } else {
    return -size;
  }
}
