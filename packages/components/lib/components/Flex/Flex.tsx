import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import {
  Size,
  FlexDistribute,
  FlexJustifyContent,
  FlexAlignItems,
  FlexAlignContent,
} from "@lib/types";
import { Box, BoxProps } from "@lib/components/Box";
import { cssProperty } from "@lib/styles/property";
import { cssFlexGap, cssFlexDistribute } from "@lib/styles/flex";

import { Item, ItemProps } from "./components";

export type { ItemProps as FlexItemProps };

export interface FlexProps extends BoxProps {
  center?: boolean;
  column?: boolean;
  reverse?: boolean;
  wrapped?: boolean;
  distribute?: FlexDistribute;
  justify?: FlexJustifyContent;
  align?: FlexAlignItems | [FlexAlignItems, FlexAlignContent];
  gap?: Size;
}

const FlexStyle = styled(Box)<FlexProps>`
  display: flex;
  ${(props) =>
    cssProperty(
      "flex-direction",
      ifExists(props.column, props.reverse ? "column-reverse" : "column"),
      ifExists(props.reverse, "row-reverse")
    )}
  ${(props) =>
    cssProperty(
      "justify-content",
      props.justify,
      ifExists(props.center, "center")
    )}
  ${(props) =>
    cssProperty(
      "align-items",
      [props.align].flat()[0],
      ifExists(props.center, "center")
    )}
  ${(props) => cssProperty("align-content", [props.align].flat()[1])}
  ${(props) => cssProperty("flex-wrap", ifExists(props.wrapped, "wrap"))}
  ${(props) => cssFlexGap(props.gap, props.column)}
  ${(props) => cssFlexDistribute(`${Item}`, props.distribute)}
`;

export const Flex = Object.assign(FlexStyle, { Item, displayName: "Flex" });
