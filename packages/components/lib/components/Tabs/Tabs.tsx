import React from "react";
import { css } from "styled-components";

import { Size } from "@lib/types";
import { cssTextTab } from "@lib/styles/typography";
import { cssTransition } from "@lib/styles/transition";
import { cssSize } from "@lib/styles/size";
import { Selection, SelectionItemProps } from "@lib/components/Selection";

import { Link, LinkProps } from "./components/Link";

export type { SelectionItemProps as TabsItemProps };
export type { LinkProps as TabsLinkProps };

export interface TabsProps {
  children?: React.ReactNode;
  w?: Size;
  h?: Size;
  font?: string;
  gap?: Size;
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
}

function TabsBase(props: TabsProps): React.ReactElement {
  const { children, w, h, font, gap, selection, onSelect } = props;

  const style = css`
    ${cssSize("width", w)}
    ${cssSize("height", h, 1)}
    ${cssSize("gap", gap)}

    ${Selection.Item} {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 0;
      padding-bottom: 2px;
      ${cssTextTab(font)}
    }

    ${Selection.Item} > a {
      height: 100%;
    }

    ${Selection.Item}[aria-selected], ${Selection.Item}:hover {
      color: ${(props) => props.theme.colors.gold.lighten(0.1).toString()};
    }

    ${Selection.Item}:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${(props) => props.theme.colors.gold.toString()};
      transform: scaleX(0);
      ${(props) => cssTransition("transform", props.theme.duration.fast, "ease")}
    }

    ${Selection.Item}[aria-selected]:after {
      transform: scaleX(1);
    }
  `;

  const selectionProps = {
    row: true,
    selection,
    onSelect,
  };

  return (
    <Selection css={style} {...selectionProps}>
      {children}
    </Selection>
  );
}

export const Tabs = Object.assign(TabsBase, {
  Item: Selection.Item,
  Link,
  displayName: "Tabs",
});
