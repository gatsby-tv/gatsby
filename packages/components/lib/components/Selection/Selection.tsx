import React from "react";
import { classNames } from "@gatsby-tv/utilities";

import { SelectionContext } from "@lib/utilities/selection";
import { ItemContext } from "@lib/utilities/item";
import { Scroll } from "@lib/components/Scroll";
import { Optional } from "@lib/components/Optional";

import { Section, SectionProps, Item, ItemProps } from "./components";

import styles from "./Selection.scss";

export type { SectionProps as SelectionSectionProps };
export type { ItemProps as SelectionItemProps };

export interface SelectionProps extends React.AriaAttributes {
  children?: React.ReactNode;
  className?: string;
  itemClass?: string;
  selection: string;
  row?: boolean;
  scrollHidden?: boolean;
  onSelect: (option: string) => void;
}

export function Selection(props: SelectionProps): React.ReactElement {
  const {
    children,
    className,
    itemClass,
    selection,
    row,
    scrollHidden = true,
    onSelect,
    "aria-label": ariaLabel,
  } = props;

  const classes = classNames(
    className,
    styles.Selection,
    row ? styles.SelectionRow : styles.SelectionColumn
  );

  return (
    <SelectionContext.Provider value={{ selection, onSelect }}>
      <ItemContext.Provider value={{ itemClass }}>
        <Optional
          component={Scroll}
          active={!row}
          $props={{ hide: scrollHidden }}
        >
          <div className={classes} role="tablist" aria-label={ariaLabel}>
            {children}
          </div>
        </Optional>
      </ItemContext.Provider>
    </SelectionContext.Provider>
  );
}

Selection.Item = Item;
Selection.Section = Section;
