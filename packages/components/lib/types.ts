import React from "react";
import Color from "color";
export type { Placement } from "@popperjs/core";

export interface EventHandler {
  (event: React.SyntheticEvent): void;
}

export type Option<T = string> = {
  value: T;
  label: string;
};

export type TextElement = "h1" | "h2" | "h3" | "h4" | "p";

export type Spacing =
  | "none"
  | "extratight"
  | "tight"
  | "base"
  | "loose"
  | "extraloose";

export type FontSize =
  | "caption"
  | "body"
  | "body-large"
  | "display-small"
  | "display-medium"
  | "display-large";

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

export type DisplaySize = "small" | "medium" | "large";

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

export type DiscreteSize =
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

export type FontWeight = "normal" | "semi-bold" | "bold" | "extra-bold";

export type BackgroundColor =
  | "darkest"
  | "darker"
  | "dark"
  | "base"
  | "light"
  | "lighter"
  | "lighest";

export type ForegroundColor = BackgroundColor;

export type Palette =
  | "gold"
  | "red"
  | "green"
  | "blue"
  | "cyan"
  | "yellow"
  | "orange"
  | "grey"
  | "white"
  | "black"
  | "trueblack";

export type IconSource = React.FC<React.SVGProps<SVGSVGElement>>;

export type IconSize =
  | "smallest"
  | "smaller"
  | "small"
  | "base"
  | "large"
  | "larger"
  | "largest";
