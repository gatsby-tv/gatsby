import React, { useState } from "react";
import { css } from "styled-components";
import Color from "color";
import { usePopper } from "react-popper";
import { useTheme } from "@gatsby-tv/utilities";

import { Modal } from "@lib/components/Modal";
import { Connected } from "@lib/components/Connected";
import { Box } from "@lib/components/Box";
import { Size, Margin, Placement } from "@lib/types";
import { cssMargin } from "@lib/styles/size";
import { cssProperty } from "@lib/styles/property";
import { cssShadow } from "@lib/styles/shadows";

import { Item, ItemProps } from "./components/Item";
import { Link, LinkProps } from "./components/Link";

export type { ItemProps as MenuItemProps };
export type { LinkProps as MenuLinkProps };

export interface MenuProps {
  children?: React.ReactNode;
  for: React.RefObject<HTMLElement>;
  active?: boolean;
  placement?: Placement;
  offset?: number[];
  bg?: Color;
  highlight?: Color;
  w?: Size;
  padding?: Margin;
  onExit?: () => void;
}

function MenuBase(props: MenuProps): React.ReactElement {
  const theme = useTheme();

  const {
    children,
    w,
    active,
    onExit,
    placement = "bottom",
    offset = [0, 10],
    bg = theme.colors.background[1],
    highlight = theme.colors.background[3],
    padding = [theme.spacing[1], theme.spacing[1.5]],
  } = props;

  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(props.for.current, popper, {
    placement: placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: offset as [number, number],
        },
      },
      {
        name: "preventOverflow",
        options: {
          altBoundary: true,
        },
      },
      {
        name: "flip",
      },
    ],
  });

  const containerStyle = css`
    ${cssShadow}
    ${cssProperty("background-color", bg.toString())}
    border-radius: ${(props) => props.theme.border.radius.smallest};

    ${Connected.Item} {
      cursor: pointer;
      border-radius: ${(props) => props.theme.border.radius.smallest};
      ${(props) =>
        cssMargin("padding", padding, [
          props.theme.spacing[0.5],
          props.theme.spacing[1],
        ])}
    }

    ${Connected.Item}:hover {
      ${cssProperty("background-color", highlight.toString())}
    }
  `;

  const popperProps = {
    ref: setPopper,
    style: styles.popper,
    w,
    ...attributes.popper,
  };

  return (
    <Modal id="menu" active={active} onExit={onExit}>
      <Box {...popperProps}>
        <Connected css={containerStyle} column align="stretch">
          {children}
        </Connected>
      </Box>
    </Modal>
  );
}

export const Menu = Object.assign(MenuBase, {
  Item,
  Link,
  displayName: "Menu",
});
