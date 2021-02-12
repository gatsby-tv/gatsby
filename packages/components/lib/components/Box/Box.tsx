import styled from "styled-components";
import Color from "color";
import { ifExists, ifNotExists } from "@gatsby-tv/utilities";

import { Size, Margin } from "@lib/types";
import { cssShadow } from "@lib/styles/shadows";
import { cssSize, cssMargin } from "@lib/styles/size";
import { cssProperty } from "@lib/styles/property";

export interface BoxProps {
  bg?: Color;
  fg?: Color;
  absolute?: boolean;
  expand?: boolean;
  shadow?: boolean;
  rounded?: Size;
  w?: Size;
  h?: Size;
  top?: Size;
  right?: Size;
  bottom?: Size;
  left?: Size;
  maxw?: Size;
  maxh?: Size;
  minw?: Size;
  minh?: Size;
  margin?: Margin;
  marginTop?: Size;
  marginRight?: Size;
  marginBottom?: Size;
  marginLeft?: Size;
  padding?: Margin;
  paddingTop?: Size;
  paddingRight?: Size;
  paddingBottom?: Size;
  paddingLeft?: Size;
  zIndex?: number;
}

export const Box = styled.div<BoxProps>`
  display: block;
  ${(props) =>
    cssProperty("position", ifExists(props.absolute, "absolute"), "relative")}
  ${(props) => cssProperty("background-color", props.bg?.toString())}
  ${(props) => cssProperty("color", props.fg?.toString())}
  ${(props) =>
    cssSize(
      "width",
      props.w,
      ifNotExists(props.absolute) && ifExists(props.expand, 1)
    )}
  ${(props) =>
    cssSize(
      "height",
      props.h,
      ifNotExists(props.absolute) && ifExists(props.expand, 1)
    )}
  ${(props) =>
    cssSize(
      "top",
      props.top,
      ifExists(props.absolute) && ifExists(props.expand, 0)
    )}
  ${(props) =>
    cssSize(
      "right",
      props.right,
      ifExists(props.absolute) && ifExists(props.expand, 0)
    )}
  ${(props) =>
    cssSize(
      "bottom",
      props.bottom,
      ifExists(props.absolute) && ifExists(props.expand, 0)
    )}
  ${(props) =>
    cssSize(
      "left",
      props.left,
      ifExists(props.absolute) && ifExists(props.expand, 0)
    )}
  ${(props) => ifExists(props.shadow, cssShadow)}
  ${(props) => cssSize("border-radius", props.rounded)}
  ${(props) => cssSize("max-width", props.maxw)}
  ${(props) => cssSize("max-height", props.maxh)}
  ${(props) => cssSize("min-width", props.minw)}
  ${(props) => cssSize("min-height", props.minh)}
  ${(props) => cssMargin("margin", props.margin)}
  ${(props) => cssSize("margin-top", props.marginTop)}
  ${(props) => cssSize("margin-right", props.marginRight)}
  ${(props) => cssSize("margin-bottom", props.marginBottom)}
  ${(props) => cssSize("margin-left", props.marginLeft)}
  ${(props) => cssMargin("padding", props.padding)}
  ${(props) => cssSize("padding-top", props.paddingTop)}
  ${(props) => cssSize("padding-right", props.paddingRight)}
  ${(props) => cssSize("padding-bottom", props.paddingBottom)}
  ${(props) => cssSize("padding-left", props.paddingLeft)}
  ${(props) => cssProperty("z-index", props.zIndex?.toString())}
`;
