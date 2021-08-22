import { useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import { Activatable, EventListener, Icon } from '@gatsby-tv/components';
import { Restart, Spinner } from '@gatsby-tv/icons';
import { Class, useComponentDidMount } from '@gatsby-tv/utilities';

import { Signal } from '@src/components/Signal';
import { OverlayProps } from '@src/types';

import { Controls } from './components/Controls';
import { Timeline } from './components/Timeline';
import styles from './MobileOverlay.scss';

export function MobileOverlay(props: OverlayProps): ReactElement {
  const { player, timeline, signal, setActive, setSuspend } = props;

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

  const onClick = useCallback(() => {
    setToggle((current) => (pinned || player.suspended ? current : !current));
  }, [pinned, player.suspended]);

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

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const id = setTimeout(() => setSuspend(false), 300);

    return () => {
      clearTimeout(id);
      setSuspend(false);
    };
  }, [player.playing])

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
    setActive(true);
  }, [timeline.scrubbing]);

  const LoadingMarkup =
    player.loading && !signal ? (
      <Icon
        className={Class(styles.Icon, styles.Loading)}
        src={Spinner}
        size="largest"
      />
    ) : null;

  return (
    <div className={styles.Overlay} onPointerUp={onPointerUp}>
      <Activatable
        className={Class(styles.Overlay, styles.Tint)}
        active={active || timeline.scrubbing}
        duration="fast"
        onTransitionEnd={onTransitionEnd}
      />
      {LoadingMarkup}
      <Signal className={styles.Signal} signal={signal} />
      <Activatable
        className={styles.Controls}
        active={active && !timeline.scrubbing && !signal}
        duration="fastest"
      >
        <Controls active={controls} onClick={onClick} {...props} />
      </Activatable>
      <Timeline className={styles.Timeline} disabled={disabled} {...props} />
      <EventListener event="orientationchange" handler={onOrientationChange} />
    </div>
  );
}
