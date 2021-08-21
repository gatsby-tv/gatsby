import { useCallback, ReactElement } from 'react';
import { Button } from '@gatsby-tv/components';
import {
  Play,
  Pause,
  Previous,
  Next,
  Expand,
  Compress,
} from '@gatsby-tv/icons';
import { Class, Time } from '@gatsby-tv/utilities';

import { OverlayProps } from '@src/types';
import styles from './Controls.scss';

export interface ControlsProps extends OverlayProps {
  className?: string;
}

export function Controls(props: ControlsProps): ReactElement {
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

  const onBackwardDblClick = useCallback(() => {
    setSeek((current) => current - 5);
    setSignal('backward');
  }, []);

  const onPlaybackClick = useCallback(
    () => setPlayback((current) => (player.loading ? current : !current)),
    [player.loading]
  );

  const onForwardDblClick = useCallback(() => {
    setSeek((current) => current + 5);
    setSignal('forward');
  }, []);

  const onFullscreenClick = useCallback(
    () => setFullscreen((current) => !current),
    []
  );

  return (
    <>
      <div className={Class(className, styles.Controls)}>
        <Button
          className={styles.Backward}
          unstyled
          onDblClick={onBackwardDblClick}
        />
        <Button
          className={Class(styles.Previous, styles.Disabled)}
          animate
          icon={Previous}
          size="small"
        />
        <Button
          className={Class(styles.Playback, player.loading && styles.Hidden)}
          animate
          icon={player.paused ? Play : Pause}
          size="larger"
          onClick={onPlaybackClick}
        />
        <Button
          className={Class(styles.Next, styles.Disabled)}
          animate
          icon={Next}
          size="small"
        />
        <Button
          className={styles.Forward}
          unstyled
          onDblClick={onForwardDblClick}
        />
      </div>
      <div className={styles.BottomRow}>
        <span className={styles.ProgressText}>{`${time} / ${duration}`}</span>
        <Button
          className={styles.Fullscreen}
          icon={fullscreen ? Compress : Expand}
          size="smallest"
          onClick={onFullscreenClick}
        />
      </div>
    </>
  );
}
