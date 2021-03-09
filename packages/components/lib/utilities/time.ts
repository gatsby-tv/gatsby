import { Time } from "@lib/types";

export const parseTime = (time: Time): string => {
  if (typeof time === "number") {
    return `${time}ms`;
  } else {
    return time;
  }
}
