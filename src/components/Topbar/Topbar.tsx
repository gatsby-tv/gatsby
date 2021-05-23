import React from 'react';
import { classNames, useFrame } from '@gatsby-tv/utilities';

import { Navigation } from './components/Navigation';
import { Search } from './components/Search';
import { Account } from './components/Account';

import styles from './Topbar.module.scss';

export interface TopbarProps {
  className?: string;
}

export function Topbar(props: TopbarProps): React.ReactElement {
  const { className } = props;
  const { screen } = useFrame();
  const classes = classNames(className, styles.Topbar);

  return (
    <div className={classes}>
      <div className={styles.NavigationContainer}>
        <Navigation />
      </div>
      <div className={styles.SearchContainer}>
        <Search />
      </div>
      <div className={styles.AccountContainer}>
        <Account />
      </div>
    </div>
  );
}
