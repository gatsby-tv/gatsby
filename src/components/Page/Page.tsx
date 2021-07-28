import React from 'react';
import Head from 'next/head';
import { Class } from '@gatsby-tv/utilities';

import { Loading } from './components/Loading';

import styles from './Page.module.scss';

export interface PageProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  margin?: boolean;
}

export function Page(props: PageProps): React.ReactElement {
  const { children, className, title, margin = true } = props;
  const classes = Class(
    className,
    styles.Page,
    !margin && styles.NoMargin
  );

  const HeaderMarkup = title ? (
    <Head>
      <title>{title}</title>
    </Head>
  ) : null;

  return (
    <>
      {HeaderMarkup}
      <div className={classes}>{children}</div>
    </>
  );
}

Page.Loading = Loading;
