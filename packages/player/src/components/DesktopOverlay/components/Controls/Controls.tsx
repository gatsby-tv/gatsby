import { useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import { Button, Menu, Selection, EventListener } from '@gatsby-tv/components';
import {
  Play,
  Pause,
  Restart,
  Expand,
  Compress,
  Gear,
  VolumeFull,
  VolumeHalf,
  VolumeMute,
} from '@gatsby-tv/icons';
import { Class, Time, useMenu } from '@gatsby-tv/utilities';

import { usePlayer } from '@src/utilities/player';
import { useFullscreen } from '@src/utilities/fullscreen';
import { useSignal } from '@src/utilities/signal';

import { Volume } from './components/Volume';
import { Settings } from './components/Settings';

import styles from './Controls.scss';

export interface ControlsProps {
  className?: string;
}

export function Controls(props: ControlsProps): ReactElement {
  const { className } = props;

  const { player, setPlayback, setVolume, setMuted, setSeek } = usePlayer();
  const [fullscreen, setFullscreen] = useFullscreen();
  const [, setSignal] = useSignal();

  const settings = useMenu<HTMLButtonElement>();
  const [slider, setSlider] = useState(false);

  const time = Time(player.time * player.duration);
  const duration = Time(player.duration);

  const onKeyDown = useCallback(
    (event: any) => {
      switch (event.key) {
        case ' ':
          event.preventDefault();
          setPlayback((current) => !current);
          return;

        case 'f':
        case 'F':
          setFullscreen((current) => !current);
          return;

        case 'k':
        case 'K':
          setPlayback((current) => !current);
          return;

        case 'm':
        case 'M':
          setMuted((current) => !current);
          return;

        case 'ArrowUp':
          event.preventDefault();
          setVolume((current) => Math.min(current + 0.05, 1));
          return;

        case 'ArrowDown':
          event.preventDefault();
          setVolume((current) => Math.max(current - 0.05, 0));
          return;

        case 'ArrowRight':
          if (!player.seeking) setSignal('forward');
          setSeek((current) => current + 5);
          return;

        case 'ArrowLeft':
          if (!player.seeking) setSignal('backward');
          setSeek((current) => current - 5);
          return;
      }
    },
    [player.seeking]
  );

  const onKeyUp = useCallback((event: any) => void event.preventDefault(), []);
  const onClick = useCallback((event: any) => void event.stopPropagation(), []);
  const onPlaybackPointerLeave = useCallback(() => void setSlider(false), []);

  const onPlaybackClick = useCallback(
    () => setPlayback((current) => !current),
    []
  );

  const onFullscreenClick = useCallback(
    () => setFullscreen((current) => !current),
    []
  );

  return (
    <div
      className={Class(className, styles.Controls)}
      onKeyUp={onKeyUp}
      onClick={onClick}
    >
      <div
        className={Class(styles.Section, styles.Playback)}
        onPointerLeave={onPlaybackPointerLeave}
      >
        <Button
          icon={player.ended ? Restart : player.paused ? Play : Pause}
          size="small"
          onClick={onPlaybackClick}
        />
        <Volume active={slider} setActive={setSlider} />
        <span className={styles.Progress}>{`${time} / ${duration}`}</span>
      </div>
      <div className={Class(styles.Section, styles.Settings)}>
        <Button
          ref={settings.ref}
          icon={Gear}
          size="small"
          onClick={settings.toggle}
        />
        <Button
          icon={fullscreen ? Compress : Expand}
          size="small"
          onClick={onFullscreenClick}
        />
        <Settings
          for={settings.ref}
          active={settings.active}
          onExit={settings.deactivate}
        />
      </div>
      <EventListener doc event="keydown" handler={onKeyDown} />
    </div>
  );
}
