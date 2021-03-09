import React, {
  useCallback,
  useEffect,
  forwardRef,
  Ref,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Box,
  Flex,
  EventListener,
  Viewport,
  Video,
} from "@gatsby-tv/components";
import {
  useTheme,
  useForwardedRef,
} from "@gatsby-tv/utilities";

import { cssCursorVisibility } from "@src/styles/cursor";
import { PlayerProps } from "@src/types";

import { useVideo } from "@src/utilities/use-video";
import { useTimeline } from "@src/utilities/use-timeline";
import { useSignal } from "@src/utilities/use-signal";

import { Overlay, Controls, Timeline } from "./components";

export const Desktop = forwardRef<HTMLVideoElement, PlayerProps>(
  (props: PlayerProps, ref: Ref<HTMLVideoElement>) => {
    const { children, fullscreen, ...videoProps } = props;

    const setFullscreen: Dispatch<SetStateAction<boolean>> =
      props.setFullscreen ?? (() => undefined);

    const theme = useTheme();
    const video = useForwardedRef<HTMLVideoElement>(ref);
    const [signal, setSignal] = useSignal();

    const timeline = useTimeline();
    const {
      player,
      setActive,
      setPlayback: setPlaybackBase,
      setSeek,
    } = useVideo(video);
    const setPlayback: Dispatch<SetStateAction<boolean>> = useCallback(
      (value) =>
        setPlaybackBase((current) => {
          const playback = typeof value === "function" ? value(current) : value;
          if (playback) {
            setSignal("play");
          } else {
            setSignal("pause");
          }
          return playback;
        }),
      []
    );

    const handleKeydown = useCallback(
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

    const timelineProps = {
      time: player.time,
      progress: player.progress,
      duration: player.duration,
      onSeek: setSeek,
      ...timeline,
    };

    const controlsProps = {
      time: player.time,
      duration: player.duration,
      paused: player.paused,
      fullscreen,
      setPlayback,
      setFullscreen,
      setSeek,
      setSignal,
    };

    const overlayProps = {
      active: player.active || timeline.scrubbing,
      loading: player.loading,
      signal,
      timeline: <Timeline {...timelineProps} />,
      controls: <Controls {...controlsProps} />,
    };

    const viewportProps = {
      h: fullscreen ? "100vh" : "calc((9 / 16) * 100vw)",
      maxh: fullscreen ? "none" : "calc(100vh - 140px)",
      minh: "480px",
      aspectRatio: player.dimensions.height / player.dimensions.width,
      overlay: <Overlay {...overlayProps} />,
      onClick: () => setPlayback((current) => !current),
      onPointerDown: () => setActive(true),
      onPointerMove: () => setActive(true),
      onPointerLeave: () => setActive(false),
    };

    useEffect(() => setActive(true), []);

    useEffect(() => {
      const id = setTimeout(setSignal, theme.duration.slow);
      return () => clearTimeout(id);
    }, [signal]);

    return (
      <Viewport ref={player.ref} {...viewportProps}>
        <Flex center h={1}>
          <Video ref={video} {...videoProps}>
            {children}
          </Video>
        </Flex>
        <EventListener event="keydown" handler={handleKeydown} />
      </Viewport>
    );
  }
);

Desktop.displayName = "DesktopPlayer";
