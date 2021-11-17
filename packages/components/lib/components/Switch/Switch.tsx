import { ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { SwitchContext } from '@lib/utilities/switch';
import { Connected } from '@lib/components/Connected';

import { Item, ItemProps } from './components';
import styles from './Switch.scss';

export type { ItemProps as SwitchItemProps };

export interface SwitchProps {
  children?: ReactNode;
  className?: string;
  selection: string;
  onSelect: (id: string) => void;
}

export function Switch(props: SwitchProps): ReactElement {
  const { children, className, selection, onSelect } = props;

  const classes = Class(className, styles.Switch);

  return (
    <SwitchContext.Provider value={{ selection, onSelect }}>
      <Connected className={classes}>{children}</Connected>
    </SwitchContext.Provider>
  );
}

Switch.Item = Item;
