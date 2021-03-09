import { css, CSSProp } from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { Time } from "@lib/types";
import { parseTime } from "@lib/utilities/parse";

export function cssTransition(
  property: string,
  duration: Time,
  timing?: string,
  delay?: Time
): CSSProp {
  return css`
    transition: ${property} ${parseTime(duration)} ${timing ?? ""}
      ${ifExists(delay, parseTime(delay as Time))};
  `;
}
