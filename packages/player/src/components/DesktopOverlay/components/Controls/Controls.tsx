import { useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import { Button, Menu, Selection, EventListener } from '@gatsby-tv/components';
import {
  Play,
  Pause,
  Expand,
  Compress,
  Gear,
  VolumeFull,
  VolumeHalf,
  VolumeMute,
} from '@gatsby-tv/icons';
import { Class, Time, useMenu } from '@gatsby-tv/utilities';

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
    setVolume,
    setMuted,
    setPinned,
    setSeek,
    setSignal,
  } = props;
  const settings = useMenu<HTMLButtonElement>();
  const volumeRef = useRef<HTMLSpanElement>(null);
  const [slider, setSlider] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [resolution, setResolution] = useState<string>('auto');

  const time = Time(player.time * player.duration);
  const duration = Time(player.duration);

  useEffect(() => {
    if (!player.active) {
      settings.deactivate();
    }
  }, [player.active]);

  useEffect(() => {
    setPinned(settings.active);
  }, [settings.active]);

  const onDragStart = useCallback((event: any) => {
    if (!volumeRef.current) return;
    event.preventDefault();
    volumeRef.current.setPointerCapture(event.pointerId);
    setDragging(true);
    const { left, width } = volumeRef.current.getBoundingClientRect();
    const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
    setVolume(value);
  }, []);

  const onDrag = useCallback(
    (event: any) => {
      if (!dragging || !volumeRef.current) return;
      const { left, width } = volumeRef.current.getBoundingClientRect();
      const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
      setVolume(value);
    },
    [dragging]
  );

  const onDragEnd = useCallback((event: any) => {
    if (!volumeRef.current) return;
    setDragging(false);
    volumeRef.current.releasePointerCapture(event.pointerId);
  }, []);

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

  return (
    <div
      className={Class(className, styles.Controls)}
      onKeyUp={onKeyUp}
      onClick={(event: any) => event.stopPropagation()}
    >
      <div
        className={Class(styles.Section, styles.Playback)}
        onPointerLeave={() => setSlider(false)}
      >
        <Button
          icon={player.paused ? Play : Pause}
          size="small"
          onClick={() => setPlayback((current) => !current)}
        />
        <Button
          icon={
            player.volume === 0 || player.muted
              ? VolumeMute
              : player.volume < 0.7
              ? VolumeHalf
              : VolumeFull
          }
          size="small"
          onPointerEnter={() => setSlider(true)}
          onClick={() => setMuted((current) => !current)}
        />
        <span
          ref={volumeRef}
          className={styles.Volume}
          onPointerDown={onDragStart}
          onPointerMove={onDrag}
          onPointerUp={onDragEnd}
          onPointerLeave={onDragEnd}
          draggable="false"
        >
          <span className={Class(styles.Slider, slider && styles.SliderActive)}>
            <span
              style={{
                right: `${100 * (1 - (player.muted ? 0 : player.volume))}%`,
              }}
              className={styles.SliderProgress}
            />
          </span>
        </span>
        <span className={styles.ProgressText}>{`${time} / ${duration}`}</span>
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
          onClick={() => setFullscreen((current) => !current)}
        />
        <Menu
          for={settings.ref}
          className={styles.Menu}
          placement="top"
          offset={[-50, 14]}
          active={settings.active}
          onExit={settings.deactivate}
        >
          <div>
            <Selection
              itemClass={styles.MenuItem}
              scrollHidden
              selection={resolution}
              onSelect={setResolution}
            >
              <Selection.Item option="1080p">
                <span>
                  1080p<sup>HD</sup>
                </span>
              </Selection.Item>
              <Selection.Item option="720p">720p</Selection.Item>
              <Selection.Item option="480p">480p</Selection.Item>
              <Selection.Item option="360p">360p</Selection.Item>
              <Selection.Item option="240p">240p</Selection.Item>
              <Selection.Item option="auto">Auto</Selection.Item>
            </Selection>
          </div>
        </Menu>
      </div>
      <EventListener doc event="keydown" handler={onKeyDown} />
    </div>
  );
}
