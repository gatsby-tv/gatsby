import React, { useState, useCallback } from "react";
import { usePopper } from "react-popper";
import { Activatable } from "@gatsby-tv/components";
import { classNames, Time, ifExists } from "@gatsby-tv/utilities";

import { OverlayProps } from "@src/types";
import styles from "./Timeline.scss";

export interface TimelineProps extends OverlayProps {
  className?: string;
  disabled?: boolean;
}

export function Timeline(props: TimelineProps): React.ReactElement {
  const { className, disabled, player, timeline, setSeek } = props;
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
    placement: "top",
    strategy: "absolute",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 25],
        },
      },
      {
        name: "preventOverflow",
        options: {
          tether: false,
          padding: 4,
        },
      },
    ],
  });

  return (
    <div
      className={className}
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
        data-active={ifExists(player.active && !disabled)}
        data-scrubbing={ifExists(timeline.scrubbing)}
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
        className={classNames(
          styles.Text,
          timeline.scrubbing && styles.TextActive
        )}
        {...attributes.popper}
      >
        {Time(timeline.position * player.duration)}
      </div>
    </div>
  );
}
