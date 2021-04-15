import React, { useCallback } from "react";
import { Button, EventListener } from "@gatsby-tv/components";
import { Play, Pause, Expand, Compress } from "@gatsby-tv/icons";
import { classNames, Time } from "@gatsby-tv/utilities";

import { OverlayProps } from "@src/types";
import styles from "./Controls.scss";

export interface ControlsProps extends OverlayProps {
  className?: string;
}

export function Controls(props: ControlsProps): React.ReactElement {
  const {
    className,
    player,
    fullscreen,
    setFullscreen,
    setPlayback,
    setSeek,
    setSignal,
  } = props;

  const time = Time(player.time * player.duration);
  const duration = Time(player.duration);

  const onKeydown = useCallback(
    (event: any) => {
      switch (event.key) {
        case " ":
          event.preventDefault();
          setPlayback((current) => !current);
          return;

        case "f":
        case "F":
          setFullscreen((current) => !current);
          return;

        case "k":
        case "K":
          setPlayback((current) => !current);
          return;

        case "ArrowRight":
          if (!player.seeking) setSignal("forward");
          setSeek((current) => current + 5);
          return;

        case "ArrowLeft":
          if (!player.seeking) setSignal("backward");
          setSeek((current) => current - 5);
          return;
      }
    },
    [player.seeking]
  );

  return (
    <div
      className={classNames(className, styles.Controls)}
      onClick={(event: any) => event.stopPropagation()}
    >
      <div className={classNames(styles.Section, styles.Playback)}>
        <Button
          icon={player.paused ? Play : Pause}
          size="small"
          onClick={() => setPlayback((current) => !current)}
        />
        <span className={styles.ProgressText}>{`${time} / ${duration}`}</span>
      </div>
      <div className={classNames(styles.Section, styles.Settings)}>
        <Button
          icon={fullscreen ? Compress : Expand}
          size="small"
          onClick={() => setFullscreen((current) => !current)}
        />
      </div>
      <EventListener event="keydown" handler={onKeydown} />
    </div>
  );
}
