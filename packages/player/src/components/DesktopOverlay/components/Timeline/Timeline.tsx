import React, { useState, useEffect } from "react";
import { usePopper } from "react-popper";
import { classNames, Time } from "@gatsby-tv/utilities";

import { OverlayProps } from "@src/types";
import styles from "./Timeline.scss";

export interface TimelineProps extends OverlayProps {
  className?: string;
}

export function Timeline(props: TimelineProps) {
  const { className, player, timeline, setSeek } = props;
  const [hovering, setHovering] = useState(false);
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
          offset: [0, 15],
        },
      },
      {
        name: "preventOverflow",
        options: {
          tether: false,
          padding: 8,
        },
      },
    ],
  });

  return (
    <div
      className={className}
      onClick={(event: any) => {
        event.stopPropagation();
        setSeek(timeline.position);
      }}
      onPointerMove={() => {
        update();
        setHovering(true);
      }}
      onPointerLeave={() => setHovering(false)}
    >
      <div ref={timeline.ref} className={styles.Timeline} {...timeline.events}>
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
        className={classNames(styles.Text, hovering && styles.TextActive)}
        {...attributes.popper}
      >
        {Time(timeline.position * player.duration)}
      </div>
    </div>
  );
}
