import { useState, ReactElement } from 'react';
import { usePopper } from 'react-popper';
import { Activatable } from '@gatsby-tv/components';
import { Class, Time, Exists } from '@gatsby-tv/utilities';

import { usePlayer } from '@src/utilities/player';
import { useTimeline } from '@src/utilities/timeline';

import styles from './Timeline.scss';

export interface TimelineProps {
  disabled: boolean;
}

export function Timeline(props: TimelineProps): ReactElement {
  const { disabled } = props;
  
  const { player, setSeek } = usePlayer();
  const timeline = useTimeline();

  const [reference, setReference] = useState<HTMLDivElement | null>(null);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);

  const buffer = `${100 * (1 - player.progress)}%`;
  const scrub = `${100 * (1 - timeline.position)}%`;
  const progress = `${
    100 * (1 - (timeline.scrubbing ? timeline.position : player.time))
  }%`;

  const {
    styles: style,
    attributes,
    update = () => undefined,
  }: any = usePopper(reference, popper, {
    placement: 'top',
    strategy: 'absolute',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 25],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          tether: false,
          padding: 4,
        },
      },
      {
        name: 'flip',
        enabled: false,
      },
    ],
  });

  return (
    <div
      onPointerUp={(event: any) => {
        event.stopPropagation();
        setSeek(timeline.position);
      }}
      onPointerDown={() => update()}
      onPointerMove={() => update()}
    >
      <div
        ref={timeline.ref}
        className={styles.Timeline}
        data-active={Exists(player.active && !disabled)}
        data-scrubbing={Exists(timeline.scrubbing)}
        {...timeline.events}
      >
        <div style={{ right: buffer }} className={styles.Buffer} />
        <div style={{ right: progress }} className={styles.Progress} />
      </div>
      <div
        ref={setReference}
        style={{ right: scrub }}
        className={styles.ScrubReference}
      />
      <div
        ref={setPopper}
        style={style.popper}
        className={Class(styles.Text, timeline.scrubbing && styles.TextActive)}
        {...attributes.popper}
      >
        {Time(timeline.position * player.duration)}
      </div>
    </div>
  );
}
