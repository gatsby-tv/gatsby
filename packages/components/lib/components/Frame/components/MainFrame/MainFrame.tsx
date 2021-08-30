import { ReactNode, ReactElement } from 'react';
import { useFrame, useFullscreen } from '@gatsby-tv/utilities';

import { Scroll } from '@lib/components/Scroll';

import styles from '../../Frame.scss';

export interface MainFrameProps {
  children?: ReactNode;
}

export function MainFrame(props: MainFrameProps): ReactElement {
  const { children } = props;
  const { screen, offset } = useFrame();
  const [fullscreen] = useFullscreen();

  return (
    <main
      style={{ height: `calc(100vh - ${offset.y}px)` }}
      className={styles.MainFrame}
    >
      <Scroll hide={fullscreen || screen.width < 650}>{children}</Scroll>
    </main>
  );
}
