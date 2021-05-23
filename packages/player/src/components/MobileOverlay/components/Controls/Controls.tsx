import React from 'react';
import { Button } from '@gatsby-tv/components';
import {
  Play,
  Pause,
  Previous,
  Next,
  Expand,
  Compress,
} from '@gatsby-tv/icons';
import { classNames, Time } from '@gatsby-tv/utilities';

import { OverlayProps } from '@src/types';
import styles from './Controls.scss';

export interface ControlsProps extends OverlayProps {
  className?: string;
}

export function Controls(props: ControlsProps): React.ReactElement {
  const {
    className,
    player,
    fullscreen,
    setFullscreen,
    setPlayback,
    setSeek,
    setSignal,
  } = props;

  const time = Time(player.time * player.duration);
  const duration = Time(player.duration);

  return (
    <>
      <div className={classNames(className, styles.Controls)}>
        <Button
          className={styles.Backward}
          unstyled
          onDblClick={() => {
            setSeek((current) => current - 5);
            setSignal('backward');
          }}
        />
        <Button
          className={classNames(styles.Previous, styles.Disabled)}
          animate
          icon={Previous}
          size="small"
        />
        {!player.loading && (
          <Button
            className={styles.Playback}
            animate
            icon={player.paused ? Play : Pause}
            size="larger"
            onClick={() => setPlayback((current) => !current)}
          />
        )}
        <Button
          className={classNames(styles.Next, styles.Disabled)}
          animate
          icon={Next}
          size="small"
        />
        <Button
          className={styles.Forward}
          unstyled
          onDblClick={() => {
            setSeek((current) => current + 5);
            setSignal('forward');
          }}
        />
      </div>
      <div className={styles.BottomRow}>
        <span className={styles.ProgressText}>{`${time} / ${duration}`}</span>
        <Button
          className={styles.Fullscreen}
          icon={fullscreen ? Compress : Expand}
          size="smallest"
          onClick={() => setFullscreen((current) => !current)}
        />
      </div>
    </>
  );
}
