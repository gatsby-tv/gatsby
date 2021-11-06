import { AriaAttributes, ReactNode, ReactElement } from 'react';
import { Class, StylesContext } from '@gatsby-tv/utilities';

import { SelectionContext } from '@lib/utilities/selection';
import { ItemContext } from '@lib/utilities/item';
import { Scroll } from '@lib/components/Scroll';
import { Optional } from '@lib/components/Optional';

import { Section, SectionProps, Item, ItemProps } from './components';

import styles from './Selection.scss';

export type { SectionProps as SelectionSectionProps };
export type { ItemProps as SelectionItemProps };

export interface SelectionProps extends AriaAttributes {
  children?: ReactNode;
  className?: string;
  itemClass?: string;
  selection?: string;
  row?: boolean;
  scrollHidden?: boolean;
  onSelect: (option: string) => void;
}

export function Selection(props: SelectionProps): ReactElement {
  const {
    children,
    className,
    itemClass,
    selection,
    row,
    scrollHidden = true,
    onSelect,
    'aria-label': ariaLabel,
  } = props;

  const classes = Class(
    className,
    styles.Selection,
    row ? styles.SelectionRow : styles.SelectionColumn
  );

  return (
    <StylesContext.Provider value={styles}>
      <SelectionContext.Provider value={{ selection, setSelection: onSelect }}>
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
    </StylesContext.Provider>
  );
}

Selection.Item = Item;
Selection.Section = Section;
