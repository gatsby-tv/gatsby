import React, { CSSProperties } from "react";
import { useTheme } from "@gatsby-tv/utilities";

import { Flex } from "@lib/components";

export type SliderState = {
  slide: number;
  desired: number;
};

export type SliderAction = { type: "jump"; desired: number } | { type: "sync" };

export interface SliderProps {
  children?: React.ReactNode;
  state: SliderState;
  groups: number;
}

export function Slider(props: SliderProps): React.ReactElement {
  const { children, state, groups } = props;
  const theme = useTheme();
  const distance = state.slide - state.desired;

  const style: CSSProperties = {
    width: `${100 * (groups + 2)}%`,
    left: `${-100 * (state.slide + 1)}%`,
    transform: "translateX(0)",
    transition: "none",
  };

  if (distance) {
    const direction =
      Math.sign(distance) * (Math.abs(distance) <= groups / 2 ? 1 : -1);

    const shift = (direction * 100) / (groups + 2);
    style.transform = `translateX(${shift}%)`;
    style.transition = `transform ${theme.duration.base}ms ease`;
  }

  return (
    <Flex style={style} css={{ willChange: "left, transform" }} align="center">
      {children}
    </Flex>
  );
}
