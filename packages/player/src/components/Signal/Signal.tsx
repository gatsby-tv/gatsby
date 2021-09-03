import { ReactElement } from 'react';
import { Icon, IconSource } from '@gatsby-tv/components';
import { Play, Pause, SkipForward, SkipBackward } from '@gatsby-tv/icons';
import { Class } from '@gatsby-tv/utilities';

import { useSignal } from '@src/utilities/signal';

import styles from './Signal.scss';

export interface SignalProps {
  className?: string;
}

export function Signal(props: SignalProps): ReactElement | null {
  const { className } = props;
  const [signal] = useSignal();

  let icon;
  switch (signal?.split('.')[0]) {
    case 'play':
      icon = Play;
      break;

    case 'pause':
      icon = Pause;
      break;

    case 'forward':
      icon = SkipForward;
      break;

    case 'backward':
      icon = SkipBackward;
      break;
  }

  const classes = Class(className, styles.Signal);

  return signal ? (
    <div key={signal} className={styles.SignalContainer}>
      <Icon className={classes} src={icon as IconSource} />
    </div>
  ) : null;
}
