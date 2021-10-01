import { useEffect, useCallback, ReactElement } from 'react';
import { Activatable, Icon } from '@gatsby-tv/components';
import { Play, Restart, Spinner } from '@gatsby-tv/icons';
import { Class } from '@gatsby-tv/utilities';

import { Signal } from '@src/components/Signal';
import { usePlayer } from '@src/utilities/player';
import { useTimeline } from '@src/utilities/timeline';
import { useSignal } from '@src/utilities/signal';

import { Controls } from './components/Controls';
import { Timeline } from './components/Timeline';

import styles from './Desktop.scss';

export function Desktop(): ReactElement {
  const { player, setActive, setPlayback } = usePlayer();
  const timeline = useTimeline();
  const [signal] = useSignal();

  const active = player.active || timeline.scrubbing;
  const classes = Class(styles.Overlay, !active && styles.CursorHidden);

  const onClick = useCallback(() => {
    // Prevents timeline from causing the user to accidentally toggle playback.
    if (player.seeking) return;
    setPlayback((current) => !current);
  }, [player.seeking]);

  const onPointerDown = useCallback(() => setActive(true), []);
  const onPointerMove = useCallback(() => setActive(true), []);
  const onPointerLeave = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (!player.playing) return;
    setActive(true);
  }, [player.playing]);

  const LoadingMarkup =
    player.loading && !signal ? (
      <Icon className={Class(styles.Icon, styles.Loading)} src={Spinner} />
    ) : null;

  const EndscreenMarkup = player.ended ? (
    <Icon className={styles.Icon} src={Restart} />
  ) : null;

  const BlockedMarkup =
    player.blocked && !player.loading && !signal ? (
      <Icon className={styles.Icon} src={Play} />
    ) : null;

  return (
    <>
      {EndscreenMarkup}
      {BlockedMarkup}
      {LoadingMarkup}
      <Signal className={styles.Signal} />
      <Activatable
        className={classes}
        active={active}
        duration="faster"
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <Controls className={styles.Controls} />
        <Timeline className={styles.Timeline} />
      </Activatable>
    </>
  );
}
