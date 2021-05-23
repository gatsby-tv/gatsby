import React from 'react';
import { Icon, IconSource } from '@gatsby-tv/components';
import { Play, Pause, SkipForward, SkipBackward } from '@gatsby-tv/icons';
import { classNames } from '@gatsby-tv/utilities';

import styles from './Signal.scss';

export interface SignalProps {
  signal?: string;
  className?: string;
  zIndex?: number;
}

export function Signal(props: SignalProps): React.ReactElement | null {
  const { signal, className, zIndex } = props;

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

  const classes = classNames(className, styles.Signal);

  return signal ? (
    <div key={signal} className={styles.SignalContainer}>
      <Icon className={classes} src={icon as IconSource} />
    </div>
  ) : null;
}
