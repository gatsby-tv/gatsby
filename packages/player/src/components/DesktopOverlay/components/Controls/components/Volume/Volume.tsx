import {
  useRef,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  ReactElement,
} from 'react';
import { Button } from '@gatsby-tv/components';
import { VolumeMute, VolumeHalf, VolumeFull } from '@gatsby-tv/icons';
import { Class } from '@gatsby-tv/utilities';

import { usePlayer } from '@src/utilities/player';

import styles from './Volume.scss';

export interface VolumeProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export function Volume(props: VolumeProps): ReactElement {
  const { active, setActive } = props;

  const { player, setMuted, setVolume } = usePlayer();

  const ref = useRef<HTMLSpanElement>(null);
  const [dragging, setDragging] = useState(false);

  const icon =
    player.volume === 0 || player.muted
      ? VolumeMute
      : player.volume < 0.7
      ? VolumeHalf
      : VolumeFull;

  const offset = 100 * (1 - (player.muted ? 0 : player.volume));

  const onClick = useCallback(() => setMuted((current) => !current), []);
  const onPointerEnter = useCallback(() => setActive(true), []);

  const onPointerDown = useCallback((event: any) => {
    if (!ref.current) return;
    event.preventDefault();
    ref.current.setPointerCapture(event.pointerId);
    setDragging(true);
    const { left, width } = ref.current.getBoundingClientRect();
    const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
    setVolume(value);
  }, []);

  const onPointerMove = useCallback(
    (event: any) => {
      if (!dragging || !ref.current) return;
      const { left, width } = ref.current.getBoundingClientRect();
      const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
      setVolume(value);
    },
    [dragging]
  );

  const onPointerUp = useCallback((event: any) => {
    if (!ref.current) return;
    ref.current.releasePointerCapture(event.pointerId);
    setDragging(false);
  }, []);

  return (
    <>
      <Button
        icon={icon}
        size="small"
        onPointerEnter={onPointerEnter}
        onClick={onClick}
      />
      <span
        ref={ref}
        className={Class(styles.Volume, active && styles.Active)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        draggable="false"
      >
        <span className={styles.Slider}>
          <span style={{ right: `${offset}%` }} className={styles.Progress} />
        </span>
      </span>
    </>
  );
}
