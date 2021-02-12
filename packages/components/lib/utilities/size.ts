import { Size, Margin } from "@lib/types";

export const parseSize = (size: Size): string => {
  if (typeof size === "number") {
    return `${100 * size}%`;
  } else {
    return size;
  }
};

export const parseMargin = (margin: Margin): string => {
  return [margin]
    .flat()
    .map((size: Size) => parseSize(size))
    .join(" ");
};
