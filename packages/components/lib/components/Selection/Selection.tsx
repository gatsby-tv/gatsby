import { AriaAttributes, ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { SelectionContext } from '@lib/utilities/selection';
import { Scroll } from '@lib/components/Scroll';
import { Optional } from '@lib/components/Optional';

import { Section, SectionProps, Item, ItemProps } from './components';

import styles from './Selection.scss';

export type { SectionProps as SelectionSectionProps };
export type { ItemProps as SelectionItemProps };

export interface SelectionProps extends AriaAttributes {
  children?: ReactNode;
  className?: string;
  selection?: string;
  row?: boolean;
  scrollHidden?: boolean;
  onSelect: (option: string) => void;
}

export function Selection(props: SelectionProps): ReactElement {
  const {
    children,
    className,
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
    <SelectionContext.Provider value={{ selection, setSelection: onSelect }}>
      <Optional
        component={Scroll}
        active={!row}
        $props={{ hide: scrollHidden }}
      >
        <div className={classes} role="tablist" aria-label={ariaLabel}>
          {children}
        </div>
      </Optional>
    </SelectionContext.Provider>
  );
}

Selection.Item = Item;
Selection.Section = Section;
