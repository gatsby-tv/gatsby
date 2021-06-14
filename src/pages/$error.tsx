import React from 'react';
import Head from 'next/head';
import { TextDisplay } from '@gatsby-tv/components';

import styles from '@src/styles/Error.module.scss';

export default function ErrorPage(): React.ReactElement {
  const HeaderMarkup = (
    <Head>
      <title>500 Error</title>
    </Head>
  );

  return (
    <>
      {HeaderMarkup}
      <div className={styles.Container}>
        <TextDisplay size="large">500 Error</TextDisplay>
        <TextDisplay size="medium">
          An error occurred with our server
        </TextDisplay>
      </div>
    </>
  );
}
