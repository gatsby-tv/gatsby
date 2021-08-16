import { ReactNode, ReactElement } from 'react';

import styles from './Header.module.scss';

export interface HeaderProps {
  children?: ReactNode;
}

export function Header(props: HeaderProps): ReactElement {
  const { children } = props;
  return <div className={styles.Header}>{children}</div>;
}
