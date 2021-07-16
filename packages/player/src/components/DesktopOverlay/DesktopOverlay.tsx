import React, { useCallback } from 'react';
import { Activatable, Icon } from '@gatsby-tv/components';
import { Spinner } from '@gatsby-tv/icons';
import { Class } from '@gatsby-tv/utilities';

import { Signal } from '@src/components/Signal';
import { OverlayProps } from '@src/types';

import { Controls } from './components/Controls';
import { Timeline } from './components/Timeline';
import styles from './DesktopOverlay.scss';

export function DesktopOverlay(props: OverlayProps): React.ReactElement {
  const { player, timeline, signal, setActive, setPlayback } = props;

  const active = player.active || timeline.scrubbing;
  const classes = Class(styles.Overlay, !active && styles.CursorHidden);

  const onClick = useCallback(() => {
    // Prevents timeline from causing the user to accidentally toggle playback.
    if (player.seeking) return;
    setPlayback((current) => !current);
  }, [player.seeking]);

  const LoadingMarkup =
    player.loading && !signal ? (
      <Icon className={styles.Loading} src={Spinner} />
    ) : null;

  return (
    <>
      {LoadingMarkup}
      <Signal className={styles.Signal} signal={signal} />
      <Activatable
        className={classes}
        active={active}
        duration="faster"
        onClick={onClick}
        onPointerDown={() => setActive(true)}
        onPointerMove={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
      >
        <Controls className={styles.Controls} {...props} />
        <Timeline className={styles.Timeline} {...props} />
      </Activatable>
    </>
  );
}
