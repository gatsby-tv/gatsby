import { ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { Selection } from '@lib/components/Selection';
import { Spacing } from '@lib/types';

import { Link, LinkProps, Item, ItemProps } from './components';
import styles from './Tabs.scss';

export type { ItemProps as TabsItemProps };
export type { LinkProps as TabsLinkProps };

export interface TabsProps {
  children?: ReactNode;
  className?: string;
  gap?: Spacing;
  selection?: string;
  onSelect: (id: string) => void;
}

export function Tabs(props: TabsProps): ReactElement {
  const { children, className, gap = 'base', selection, onSelect } = props;

  const classes = Class(className, styles.Tabs, styles[`Gap-${gap}`]);

  return (
    <Selection
      className={classes}
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
