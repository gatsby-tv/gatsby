import { ReactElement } from 'react';
import { Stars, Fireworks, Icon } from '@gatsby-tv/components';
import { useFrame } from '@gatsby-tv/utilities';
import { ExtendDown, Gatsby } from '@gatsby-tv/icons';

import styles from './Landing.module.scss';

export function Landing(): ReactElement {
  const { screen, offset } = useFrame();

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
      <Icon className={styles.DownArrow} src={ExtendDown} size="largest" />
    </div>
  );
}
