import React from 'react';
import {
  Stars,
  Fireworks,
  Icon,
  TextBox,
  TextHeading,
  TextSubheading,
  TextDisplay,
} from '@gatsby-tv/components';
import { useFrame } from '@gatsby-tv/utilities';
import { ExtendDown, Gatsby } from '@gatsby-tv/icons';

import { Page } from '@src/components/Page';

import styles from '@src/styles/About.module.scss';

export default function AboutPage(): React.ReactElement {
  const { screen, offset } = useFrame();

  return (
    <Page className={styles.Page} title="Gatsby - About">
      <Stars />
      <Fireworks count={3} delay={750} background />
      <div
        style={{ height: screen.height - offset.y }}
        className={styles.TitlePage}
      >
        <h1 className={styles.Title}>
          <Icon className={styles.TitleIcon} src={Gatsby} />
          Gatsby
        </h1>
        <h2 className={styles.Subtitle}>
          The Video Sharing Platform of our Dreams
        </h2>
        <Icon className={styles.DownArrow} src={ExtendDown} size="largest" />
      </div>
      <div className={styles.Content}>
        <div className={styles.Body}>
          <h3>The Party where Everyone is Invited</h3>
          <p>
            Gatsby is a video sharing platform based on peer-to-peer file distribution.
          </p>
        </div>
      </div>
    </Page>
  );
}
