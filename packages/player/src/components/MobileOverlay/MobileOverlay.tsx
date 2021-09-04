import { useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import {
  Activatable,
  EventListener,
  Icon,
  Injection,
} from '@gatsby-tv/components';
import { Spinner } from '@gatsby-tv/icons';
import { Class, useComponentDidMount, useUniqueId } from '@gatsby-tv/utilities';

import { Signal } from '@src/components/Signal';
import { usePlayer } from '@src/utilities/player';
import { useSignal } from '@src/utilities/signal';
import { useTimeline } from '@src/utilities/timeline';
import { useFullscreen } from '@src/utilities/fullscreen';

import { Controls } from './components/Controls';
import { Timeline } from './components/Timeline';

import styles from './MobileOverlay.scss';

export function MobileOverlay(): ReactElement {
  const { player, setActive } = usePlayer();
  const timeline = useTimeline();
  const [signal] = useSignal();
  const [fullscreen] = useFullscreen();

  const overlay = useUniqueId('overlay');
  const mounted = useComponentDidMount();
  const paused = useRef(player.paused);
  const loading = useRef(player.loading);
  const started = useRef(false);
  const [disabled, setDisabled] = useState(false);
  const [controls, setControls] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [toggle, setToggle] = useState(false);
  const active = player.active && !disabled;

  const onPointerUp = useCallback(
    () => setToggle((current) => (pinned ? current : !current)),
    [pinned]
  );

  const onTransitionEnd = useCallback(() => setControls(active), [active]);
  const onOrientationChange = useCallback(() => setActive(false), []);

  useEffect(() => void (paused.current = player.paused), [player.paused]);
  useEffect(() => void (loading.current = player.loading), [player.loading]);
  useEffect(() => setPinned(true), [player.active]);

  useEffect(() => {
    if (!pinned) return;
    const id = setTimeout(() => setPinned(false), 300);
    return () => clearTimeout(id);
  }, [pinned]);

  useEffect(
    () =>
      setActive((current) =>
        !mounted.current || paused.current || loading.current
          ? current
          : !current
      ),
    [toggle]
  );

  useEffect(() => {
    if (!paused.current && !loading.current) return;
    setDisabled((current) => !current);
  }, [toggle]);

  useEffect(() => {
    if (player.paused || player.loading) return;
    setDisabled(false);
  }, [player.paused, player.loading]);

  useEffect(() => {
    if (!timeline.scrubbing) return;
    setDisabled(false);
  }, [timeline.scrubbing]);

  const classes = Class(styles.Overlay, fullscreen && styles.Fullscreen);

  const LoadingMarkup =
    player.loading && !signal ? (
      <Icon
        className={Class(styles.Icon, styles.Loading)}
        src={Spinner}
        size="largest"
      />
    ) : null;

  return (
    <div className={classes} onPointerUp={onPointerUp}>
      <Activatable
        className={Class(styles.Overlay, styles.Tint)}
        active={active || timeline.scrubbing}
        duration="fast"
        onTransitionEnd={onTransitionEnd}
      />
      {LoadingMarkup}
      <Signal className={styles.Signal} />
      <Activatable
        className={styles.Controls}
        active={active && !timeline.scrubbing && !signal}
        duration="fastest"
      >
        <Controls overlay={overlay} active={controls} onClick={onPointerUp} />
      </Activatable>
      <Activatable
        className={styles.Timeline}
        active={!fullscreen || active}
        duration="fastest"
      >
        <Timeline disabled={disabled} />
      </Activatable>
      <Injection.Target id={overlay} className={styles.Target} />
      <EventListener event="orientationchange" handler={onOrientationChange} />
    </div>
  );
}
