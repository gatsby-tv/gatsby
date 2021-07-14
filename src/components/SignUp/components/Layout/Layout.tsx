import React from 'react';
import { Fireworks } from '@gatsby-tv/components';

import styles from './Layout.module.scss';

export interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout(props: LayoutProps): React.ReactElement {
  const { children } = props;

  return (
    <div className={styles.Layout}>
      {children}
      <Fireworks background />
    </div>
  );
}
