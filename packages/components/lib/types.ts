import React from "react";
import Color from "color";
export type { Placement } from "@popperjs/core";

export interface EventHandler {
  (event: React.SyntheticEvent): void;
}

export type FontSize = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type SpacingSize =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10;

export type DisplaySize = "small" | "large";

export type BorderWidth =
  | "none"
  | "smallest"
  | "small"
  | "base"
  | "large"
  | "largest";

export type BorderRadius =
  | "none"
  | "smallest"
  | "small"
  | "base"
  | "large"
  | "largest"
  | "full";

type DiscreteSize =
  | "smallest"
  | "smaller"
  | "small"
  | "base"
  | "large"
  | "larger"
  | "largest";

export type Duration =
  | "instant"
  | "fastest"
  | "faster"
  | "fast"
  | "base"
  | "slow"
  | "slower"
  | "slowest";

export type LineHeight = "body" | "heading";

export type FontWeight = "normal" | "semiBold" | "bold";

export type FontColor = "body" | "subdued" | "inverted";

export type BackgroundColor = 0 | 1 | 2 | 3 | 4 | 5;

export type ShadowColor = "dark" | "light";

export type ColorHue =
  | "placeholder"
  | "popover"
  | "error"
  | "gold"
  | "blue"
  | "pink"
  | "green"
  | "white"
  | "black"
  | "trueblack";

export type IconSource = React.FC<React.SVGProps<SVGSVGElement>>;

export type Size = number | string;

export type Margin = Size | Size[];

export type FlexDistribute = "fill" | "fill-evenly";

export type FlexJustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "end"
  | "left"
  | "right";

export type FlexAlignItems =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "first baseline"
  | "last baseline"
  | "start"
  | "end"
  | "self-start"
  | "self-end";

export type FlexAlignContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch"
  | "start"
  | "end"
  | "baseline"
  | "first baseline"
  | "last baseline";

export type GridJustifyItems = "start" | "end" | "center" | "stretch";

export type GridAlignItems = "start" | "end" | "center" | "stretch";

export type GridJustifyContent =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "space-around"
  | "space-between"
  | "space-evenly";

export type GridAlignContent =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "space-around"
  | "space-between"
  | "space-evenly";

export interface Theme {
  colors: {
    font: Record<FontColor, Color>;
    background: Record<BackgroundColor, Color>;
    inverted: Record<BackgroundColor, Color>;
    shadow: Record<ShadowColor, Color>;
  } & Record<ColorHue, Color>;

  font: Record<FontSize, string>;
  icon: Record<DiscreteSize, string>;
  avatar: Record<DiscreteSize, string>;

  border: {
    radius: Record<BorderRadius, string>;
    width: Record<BorderWidth, string>;
  };

  spacing: Record<SpacingSize, string>;
  duration: Record<Duration, string>;

  lineHeight: Record<LineHeight, number>;
  weight: Record<FontWeight, number>;
}
