import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  Ref,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Viewport,
  Box,
  Flex,
  Video,
  EventListener,
} from "@gatsby-tv/components";
import { useTheme, useForwardedRef } from "@gatsby-tv/utilities";

import { PlayerProps } from "@src/types";

import { useVideo } from "@src/utilities/use-video";
import { useTimeline } from "@src/utilities/use-timeline";
import { useSignal } from "@src/utilities/use-signal";

import { Overlay, Controls, Timeline } from "./components";

export const Mobile = forwardRef<HTMLVideoElement, PlayerProps>(
  (props: PlayerProps, ref: Ref<HTMLVideoElement>) => {
    const { children, fullscreen, ...videoProps } = props;

    const setFullscreen: Dispatch<SetStateAction<boolean>> =
      props.setFullscreen ?? (() => undefined);

    const theme = useTheme();
    const video = useForwardedRef<HTMLVideoElement>(ref);
    const [signal, setSignal] = useSignal();
    const [controls, setControls] = useState(true);
    const [disabled, setDisabled] = useState(false);

    const timeline = useTimeline();
    const { player, setActive, setPlayback, setSeek } = useVideo(video);

    const onPointerUp = useCallback(() => {
      setActive((current) => {
        if (!controls) return current;
        setControls(false);
        if (player.paused) {
          setDisabled((current) => !current);
          return current;
        } else {
          return !current;
        }
      })
    }, [controls, disabled, player.paused]);

    useEffect(() => {
      const id = setTimeout(() => setControls(true), theme.duration.fast);
      return () => clearTimeout(id);
    }, [controls]);

    useEffect(() => {
      if (!player.paused) {
        setDisabled(false);
      }
    }, [player.paused]);

    useEffect(() => {
      if (timeline.scrubbing) {
        setDisabled(false);
        setActive(true);
      }
    }, [timeline.scrubbing]);

    const timelineProps = {
      active: player.active && !disabled,
      time: player.time,
      progress: player.progress,
      duration: player.duration,
      onSeek: setSeek,
      ...timeline,
    };

    const controlsProps = {
      paused: player.paused,
      loading: player.loading,
      fullscreen,
      time: player.time,
      duration: player.duration,
      setPlayback,
      setFullscreen,
      setSeek,
      setSignal,
    };

    const overlayProps = {
      active: player.active && !disabled,
      loading: player.loading,
      scrubbing: timeline.scrubbing,
      signal,
      fullscreen,
      timeline: <Timeline {...timelineProps} />,
      controls: <Controls {...controlsProps} />,
    };

    const viewportProps = {
      h: "calc((9 / 16) * 100vw)",
      maxh: "100vh",
      aspectRatio: player.dimensions.height / player.dimensions.width,
      overlay: <Overlay {...overlayProps} />,
      onPointerUp,
    };

    const orientationProps = {
      event: "orientationchange",
      handler: () => setActive(false),
    };

    return (
      <Viewport ref={player.ref} {...viewportProps}>
        <Flex center h={1}>
          <Video ref={video} {...videoProps}>
            {children}
          </Video>
        </Flex>
        <EventListener {...orientationProps} />
      </Viewport>
    );
  }
);

Mobile.displayName = "MobilePlayer";
