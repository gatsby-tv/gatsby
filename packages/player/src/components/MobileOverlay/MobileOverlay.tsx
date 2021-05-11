import React, { useState, useEffect, useCallback } from "react";
import { Activatable, EventListener, Icon } from "@gatsby-tv/components";
import { Spinner } from "@gatsby-tv/icons";
import { classNames } from "@gatsby-tv/utilities";

import { Signal } from "@src/components/Signal";
import { OverlayProps } from "@src/types";

import { Controls } from "./components/Controls";
import { Timeline } from "./components/Timeline";
import styles from "./MobileOverlay.scss";

export function MobileOverlay(props: OverlayProps): React.ReactElement {
  const {
    player,
    timeline,
    signal,
    setActive,
  } = props;

  const [disabled, setDisabled] = useState(false);
  const [controls, setControls] = useState(false);
  const [activatable, setActivatable] = useState(true);
  const active = player.active && !disabled;

  const onPointerUp = useCallback(
    () =>
      setActive((current) => {
        if (!activatable) return current;
        setActivatable(false);
        if (player.paused || player.loading) {
          setDisabled((current) => !current);
          return current;
        } else {
          return !current;
        }
      }),
    [activatable, disabled, player.paused, player.loading]
  );

  useEffect(() => {
    const id = setTimeout(() => setActivatable(true), 300);
    return () => clearTimeout(id);
  }, [activatable]);

  useEffect(() => {
    if (active) {
      const id = setTimeout(() => setControls(true), 100);
      return () => clearTimeout(id);
    } else {
      setControls(false);
    }
  }, [active]);

  useEffect(() => {
    if (!player.paused && !player.loading) {
      setDisabled(false);
    }
  }, [player.paused, player.loading]);

  useEffect(() => {
    if (timeline.scrubbing) {
      setDisabled(false);
      setActive(true);
    }
  }, [timeline.scrubbing]);

  const LoadingMarkup =
    player.loading && !signal ? (
      <Icon className={styles.Loading} src={Spinner} size="largest" />
    ) : null;

  return (
    <div className={styles.Overlay} onPointerUp={onPointerUp}>
      <Activatable
        className={classNames(styles.Overlay, styles.Tint)}
        active={active || timeline.scrubbing}
        duration="fast"
      />
      {LoadingMarkup}
      <Signal className={styles.Signal} signal={signal} />
      <Activatable
        className={classNames(
          styles.Controls,
          !controls && styles.ControlsDisabled
        )}
        active={active && !timeline.scrubbing && !signal}
        duration="fastest"
      >
        <Controls {...props} />
      </Activatable>
      <Timeline className={styles.Timeline} disabled={disabled} {...props} />
      <EventListener
        event="orientationchange"
        handler={() => setActive(false)}
      />
    </div>
  );
}
