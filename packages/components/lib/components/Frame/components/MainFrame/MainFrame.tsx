import { ReactNode, ReactElement } from 'react';
import { useFrame, useFullscreen, Class } from '@gatsby-tv/utilities';

import { Scroll } from '@lib/components/Scroll';

import styles from '@lib/components/Frame/Frame.scss';

export interface MainFrameProps {
  children?: ReactNode;
  className?: string;
}

export function MainFrame(props: MainFrameProps): ReactElement {
  const { children, className } = props;
  const { screen, offset } = useFrame();
  const [fullscreen] = useFullscreen();

  return (
    <main
      style={{ height: `calc(100vh - ${offset.y}px)` }}
      className={Class(className, styles.MainFrame)}
    >
      <Scroll hide={fullscreen || screen.width < 650}>{children}</Scroll>
    </main>
  );
}
