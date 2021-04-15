import React from "react";
import { classNames } from "@gatsby-tv/utilities";

import { SwitchContext } from "@lib/utilities/switch";
import { ItemContext } from "@lib/utilities/item";
import { Connected } from "@lib/components/Connected";

import { Item, ItemProps } from "./components";
import styles from "./Switch.scss";

export type { ItemProps as SwitchItemProps };

export interface SwitchProps {
  children?: React.ReactNode;
  className?: string;
  itemClass?: string;
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
}

export function Switch(props: SwitchProps): React.ReactElement {
  const { children, className, itemClass, selection, onSelect } = props;

  const classes = classNames(className, styles.Switch);

  return (
    <SwitchContext.Provider value={{ selection, onSelect }}>
      <ItemContext.Provider value={{ itemClass }}>
        <Connected className={classes}>
          {children}
        </Connected>
      </ItemContext.Provider>
    </SwitchContext.Provider>
  );
}

Switch.Item = Item;
