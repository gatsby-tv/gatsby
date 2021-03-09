import { Size, Margin, Time } from "@lib/types";

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

export const parseTime = (time: Time): string => {
  if (typeof time === "number") {
    return `${time}ms`;
  } else {
    return time;
  }
}
