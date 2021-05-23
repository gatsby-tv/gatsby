import React from 'react';
import { useFrame } from '@gatsby-tv/utilities';

import { Scroll } from '@lib/components/Scroll';

import styles from '../../Frame.scss';

export interface MainFrameProps {
  children?: React.ReactNode;
}

export function MainFrame(props: MainFrameProps): React.ReactElement {
  const { children } = props;
  const { fullscreen, screen, offset } = useFrame();

  return (
    <main className={styles.MainFrame}>
      <Scroll hide={fullscreen || screen.width < 650}>{children}</Scroll>
    </main>
  );
}
