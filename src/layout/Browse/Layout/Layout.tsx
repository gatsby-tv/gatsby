import { ReactNode, ReactElement } from 'react';

import styles from './Layout.module.scss';

export interface LayoutProps {
  children?: ReactNode;
}

export function Layout(props: LayoutProps): ReactElement {
  const { children } = props;
  return <div className={styles.Layout}>{children}</div>;
}
