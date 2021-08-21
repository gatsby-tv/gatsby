import { useState, useEffect, useCallback, ReactElement } from 'react';
import { Activatable, EventListener, Icon } from '@gatsby-tv/components';
import { Spinner } from '@gatsby-tv/icons';
import { Class } from '@gatsby-tv/utilities';

import { Signal } from '@src/components/Signal';
import { OverlayProps } from '@src/types';

import { Controls } from './components/Controls';
import { Timeline } from './components/Timeline';
import styles from './MobileOverlay.scss';

export function MobileOverlay(props: OverlayProps): ReactElement {
  const { player, timeline, signal, setActive } = props;

  const [disabled, setDisabled] = useState(false);
  const [controls, setControls] = useState(false);
  const [pinned, setPinned] = useState(false);
  const active = player.active && !disabled;

  const onPointerUp = useCallback(
    () =>
      setActive((current) => {
        if (pinned) return current;
        setPinned(true);
        if (!player.paused && !player.loading) return !current;
        setDisabled((current) => !current);
        return current;
      }),
    [pinned, disabled, player.paused, player.loading]
  );

  const onTransitionEnd = useCallback(() => setControls(active), [active]);
  const onOrientationChange = useCallback(() => setActive(false), []);

  useEffect(() => {
    const id = setTimeout(() => setPinned(false), 300);
    return () => clearTimeout(id);
  }, [pinned]);

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
      <Icon className={styles.Loading} src={Spinner} size="largest" />
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
        className={Class(styles.Controls, !controls && styles.ControlsDisabled)}
        active={active && !timeline.scrubbing && !signal}
        duration="fastest"
      >
        <Controls {...props} />
      </Activatable>
      <Timeline className={styles.Timeline} disabled={disabled} {...props} />
      <EventListener event="orientationchange" handler={onOrientationChange} />
    </div>
  );
}
