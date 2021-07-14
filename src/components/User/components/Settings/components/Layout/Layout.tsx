import React from 'react';

import styles from './Layout.module.scss';

export interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout(props: LayoutProps): React.ReactElement {
  const { children } = props;
  return <div className={styles.Layout}>{children}</div>;
}
