import React from 'react';
import { classNames } from '@gatsby-tv/utilities';

import { Selection } from '@lib/components/Selection';
import { Spacing } from '@lib/types';

import { Link, LinkProps, Item, ItemProps } from './components';
import styles from './Tabs.scss';

export type { ItemProps as TabsItemProps };
export type { LinkProps as TabsLinkProps };

export interface TabsProps {
  children?: React.ReactNode;
  className?: string;
  itemClass?: string;
  gap?: Spacing;
  selection?: string;
  onSelect: (id: string) => void;
}

export function Tabs(props: TabsProps): React.ReactElement {
  const {
    children,
    className,
    itemClass,
    gap = 'base',
    selection,
    onSelect,
  } = props;

  const classes = classNames(className, styles.Tabs, styles[`Tabs-gap-${gap}`]);

  return (
    <Selection
      className={classes}
      itemClass={itemClass}
      row
      selection={selection}
      onSelect={onSelect}
    >
      {children}
    </Selection>
  );
}

Tabs.Item = Item;
Tabs.Link = Link;
