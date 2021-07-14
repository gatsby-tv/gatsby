import React from 'react';

import styles from './Header.module.scss';

export interface HeaderProps {
  children?: React.ReactNode;
}

export function Header(props: HeaderProps): React.ReactElement {
  const { children } = props;
  return <div className={styles.Header}>{children}</div>;
}
