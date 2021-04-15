import React, { useState } from "react";
import { usePopper } from "react-popper";
import { classNames } from "@gatsby-tv/utilities";

import { Modal } from "@lib/components/Modal";
import { Connected } from "@lib/components/Connected";
import { ItemContext } from "@lib/utilities/item";
import { Placement } from "@lib/types";

import { Item, ItemProps } from "./components/Item";
import { Link, LinkProps } from "./components/Link";
import styles from "./Menu.scss";

export type { ItemProps as MenuItemProps };
export type { LinkProps as MenuLinkProps };

export interface MenuProps {
  children?: React.ReactNode;
  className?: string;
  itemClass?: string;
  for: React.RefObject<HTMLElement>;
  active?: boolean;
  placement?: Placement;
  offset?: number[];
  onExit?: () => void;
}

export function Menu(props: MenuProps): React.ReactElement {
  const {
    children,
    className,
    itemClass,
    active,
    onExit,
    placement = "bottom",
    offset = [0, 10],
  } = props;

  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const { styles: style, attributes } = usePopper(props.for.current, popper, {
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

  const classes = classNames(className, styles.Menu);

  return (
    <ItemContext.Provider value={{ itemClass }}>
      <Modal id="menu" active={active} onExit={onExit}>
        <div ref={setPopper} style={style.popper} {...attributes.popper}>
          <Connected className={classes} column>
            {children}
          </Connected>
        </div>
      </Modal>
    </ItemContext.Provider>
  );
}

Menu.Item = Item;
Menu.Link = Link;
