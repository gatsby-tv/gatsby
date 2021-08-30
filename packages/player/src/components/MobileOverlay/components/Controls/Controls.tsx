import { useState, useEffect, useCallback, ReactElement } from 'react';
import { Button } from '@gatsby-tv/components';
import {
  Play,
  Pause,
  Previous,
  Next,
  Restart,
  Expand,
  Compress,
  Misc,
} from '@gatsby-tv/icons';
import { Class, Time, useController } from '@gatsby-tv/utilities';

import { OverlayProps } from '@src/types';

import { Settings } from './components/Settings';

import styles from './Controls.scss';

export interface ControlsProps extends OverlayProps {
  className?: string;
  active?: boolean;
  onClick?: (event: any) => void;
}

export function Controls(props: ControlsProps): ReactElement {
  const {
    className,
    active,
    player,
    fullscreen,
    setFullscreen,
    setPlayback,
    setSuspend,
    setSeek,
    setSignal,
    onClick,
  } = props;

  const settings = useController();

  const [skip, setSkip] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const time = Time(player.time * player.duration);
  const duration = Time(player.duration);

  const onBackwardDblClick = useCallback(() => {
    setSuspend(true);
    setSkip(setTimeout(() => setSuspend(false), 700));
    setSeek((current) => current - 5);
    setSignal('backward');
  }, []);

  const onPlaybackClick = useCallback(
    () => setPlayback((current) => (player.loading ? current : !current)),
    [player.loading]
  );

  const onForwardDblClick = useCallback(() => {
    setSuspend(true);
    setSkip(setTimeout(() => setSuspend(false), 700));
    setSeek((current) => current + 5);
    setSignal('forward');
  }, []);

  const onFullscreenClick = useCallback(
    () => setFullscreen((current) => !current),
    []
  );

  useEffect(() => {
    if (!skip) return;
    return () => clearTimeout(skip);
  }, [skip]);

  return (
    <>
      <div className={styles.TopRow}>
        <Button
          className={Class(styles.Icon, !active && styles.Inactive)}
          animate
          icon={Misc}
          size="smaller"
          onClick={settings.toggle}
        />
      </div>
      <div className={Class(className, styles.Controls)}>
        <Button
          className={styles.Backward}
          unstyled
          onClick={onClick}
          onDblClick={onBackwardDblClick}
        />
        <Button
          className={Class(
            styles.Previous,
            styles.Disabled,
            !active && styles.Inactive
          )}
          animate
          icon={Previous}
          size="small"
        />
        <Button
          className={Class(
            styles.Playback,
            player.loading && styles.Hidden,
            (!active || player.loading) && styles.Inactive
          )}
          animate
          icon={player.ended ? Restart : player.paused ? Play : Pause}
          size="larger"
          onClick={onPlaybackClick}
        />
        <Button
          className={Class(
            styles.Next,
            styles.Disabled,
            !active && styles.Inactive
          )}
          animate
          icon={Next}
          size="small"
        />
        <Button
          className={styles.Forward}
          unstyled
          onClick={onClick}
          onDblClick={onForwardDblClick}
        />
      </div>
      <div className={styles.BottomRow}>
        <span className={styles.ProgressText}>{`${time} / ${duration}`}</span>
        <Button
          className={Class(styles.Icon, !active && styles.Inactive)}
          animate
          icon={fullscreen ? Compress : Expand}
          size="smallest"
          onClick={onFullscreenClick}
        />
      </div>
      <Settings {...props} active={settings.active} onExit={settings.deactivate} />
    </>
  );
}
