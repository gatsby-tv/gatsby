import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import {
  Size,
  GridJustifyItems,
  GridJustifyContent,
  GridAlignItems,
  GridAlignContent,
} from "@lib/types";
import { Box, BoxProps } from "@lib/components/Box";
import { cssProperty } from "@lib/styles/property";
import { cssSize } from "@lib/styles/size";

import { Item, ItemProps } from "./components/Item";

export type { ItemProps as GridItemProps };

export interface GridProps extends BoxProps {
  template?: string | string[];
  center?: boolean;
  justify?: GridJustifyItems | [GridJustifyItems, GridJustifyContent];
  align?: GridAlignItems | [GridAlignItems, GridAlignContent];
  gap?: Size | Size[];
}

const GridStyle = styled(Box)<GridProps>`
  display: grid;
  ${(props) => cssProperty("grid-template-columns", [props.template].flat()[0])}
  ${(props) => cssProperty("grid-template-rows", [props.template].flat()[1])}
  ${(props) =>
    cssProperty(
      "justify-items",
      [props.justify].flat()[0],
      ifExists(props.center, "center")
    )}
  ${(props) => cssProperty("justify-content", [props.justify].flat()[1])}
  ${(props) =>
    cssProperty(
      "align-items",
      [props.align].flat()[0],
      ifExists(props.center, "center")
    )}
  ${(props) => cssProperty("align-content", [props.align].flat()[1])}
  ${(props) => cssSize("column-gap", [props.gap].flat()[0])}
  ${(props) => cssSize("row-gap", [props.gap].flat()[1], [props.gap].flat()[0])}
`;

export const Grid = Object.assign(GridStyle, { Item, displayName: "Grid" });
