import React from 'react';
import { TextDisplay } from '@gatsby-tv/components';

import { Page } from '@src/components/Page';

import styles from '@src/styles/Error.module.scss';

export default function ErrorPage(): React.ReactElement {
  return (
    <Page className={styles.Container} title="500 Error">
      <TextDisplay size="large">500 Error</TextDisplay>
      <TextDisplay size="medium">An error occurred with our server</TextDisplay>
    </Page>
  );
}
