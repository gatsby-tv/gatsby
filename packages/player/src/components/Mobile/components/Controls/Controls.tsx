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

import { usePlayer } from '@src/utilities/player';
import { useSignal } from '@src/utilities/signal';
import { useFullscreen } from '@src/utilities/fullscreen';

import { Settings } from './components/Settings';

import styles from './Controls.scss';

export interface ControlsProps {
  overlay: string;
  active: boolean;
  onClick: (event: any) => void;
}

export function Controls(props: ControlsProps): ReactElement {
  const { overlay, active, onClick: onClickHandler } = props;

  const { player, setPlayback, setSeek } = usePlayer();
  const [, setSignal] = useSignal();
  const [fullscreen, setFullscreen] = useFullscreen();
  const settings = useController();

  const [skipping, setSkipping] = useState(0);

  const time = Time(player.time * player.duration);
  const duration = Time(player.duration);

  const onClick = useCallback((event: any) => {
    if (skipping) return;
    onClickHandler(event);
  }, [skipping]);

  const onBackwardDblClick = useCallback(() => {
    setSkipping((current) => current + 1);
    setSeek((current) => current - 5);
    setSignal('backward');
  }, []);

  const onForwardDblClick = useCallback(() => {
    setSkipping((current) => current + 1);
    setSeek((current) => current + 5);
    setSignal('forward');
  }, []);

  const onPlaybackClick = useCallback(
    () => setPlayback((current) => (player.loading ? current : !current)),
    [player.loading]
  );

  const onFullscreenClick = useCallback(
    () => setFullscreen((current) => !current),
    []
  );

  useEffect(() => {
    if (!skipping) return;
    const id = setTimeout(() => setSkipping(0), 700);
    return () => clearTimeout(id);
  }, [skipping]);

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
      <div className={styles.Controls}>
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
      <Settings overlay={overlay} active={settings.active} onExit={settings.deactivate} />
    </>
  );
}
