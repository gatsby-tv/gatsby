import React from 'react';
import Head from 'next/head';
import { classNames } from '@gatsby-tv/utilities';

import { Body, BodyProps } from './components/Body';
import { Loading, LoadingProps } from './components/Loading';

import styles from './Page.module.scss';

export interface PageProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  tight?: boolean;
}

export type { BodyProps as PageBodyProps };
export type { LoadingProps as PageLoadingProps };

export function Page(props: PageProps): React.ReactElement {
  const { children, className, title, tight } = props;
  const classes = classNames(className, styles.Page, tight && styles.Tight);

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

Page.Body = Body;
Page.Loading = Loading;
