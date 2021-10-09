import { ReactElement } from 'react';
import { Stars, Link, Fireworks, Icon } from '@gatsby-tv/components';
import { Class, useFrame } from '@gatsby-tv/utilities';
import { ExtendDown, Discord, Github, Gatsby } from '@gatsby-tv/icons';

import styles from './Landing.module.scss';

export function Landing(): ReactElement {
  const { screen, offset } = useFrame();
  const tight = screen.width < 850;

  return (
    <div
      style={{ height: screen.height - offset.y }}
      className={styles.Landing}
    >
      <div className={styles.Graphics}>
        <Stars />
        <Fireworks count={3} />
      </div>
      <h1>
        <Icon className={styles.Icon} src={Gatsby} />
        Gatsby
      </h1>
      <h2>The Party where Everyone is Invited</h2>
      <div className={styles.CallsToAction}>
        <Link
          className={Class(styles.Link, styles.GitHub)}
          href="https://github.com/gatsby-tv"
        >
          <Icon src={Github} size={tight ? "small" : "base"} />
          See our GitHub
        </Link>
        <Link className={Class(styles.Link, styles.Discord)}>
          <Icon src={Discord} size={tight ? "small" : "base"} />
          Join our Discord
        </Link>
      </div>
      <Icon className={styles.DownArrow} src={ExtendDown} size="largest" />
    </div>
  );
}
