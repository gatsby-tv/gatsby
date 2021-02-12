import React, {
  useCallback,
  useState,
  useEffect,
  useReducer,
  useRef,
  forwardRef,
  Ref,
} from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBackward,
  Spinner,
} from "@gatsby-tv/icons";
import {
  useTheme,
  useForwardedRef,
  useResizeObserver,
} from "@gatsby-tv/utilities";

import { Activatable } from "@lib/components/Activatable";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { EventListener } from "@lib/components/EventListener";
import { Viewport } from "@lib/components/Viewport";
import { Video, VideoProps } from "@lib/components/Video";
import { cssCursorVisibility } from "@lib/styles/cursor";

import { Controls, Shading, Signal, Timeline } from "./components";

interface Dimensions {
  width: number;
  height: number;
}

type PlayerAction =
  | { type: "activate" }
  | { type: "deactivate" }
  | { type: "idle" }
  | { type: "pause" }
  | { type: "waiting" }
  | { type: "playing" }
  | { type: "stalled" }
  | { type: "seeking" }
  | { type: "seeked" }
  | { type: "scrub"; time: number }
  | { type: "noscrub" }
  | { type: "timeupdate"; time: number }
  | { type: "progress"; progress: number }
  | { type: "hover"; position: number }
  | { type: "nohover" }
  | { type: "ended" };

interface PlayerState {
  active: boolean;
  idletime: number;
  playing: boolean;
  paused: boolean;
  stalled: boolean;
  seeking: boolean;
  scrubbing: boolean;
  waiting: boolean;
  hovering: boolean;
  time: number;
  progress: number;
  hover: number;
  ended: boolean;
}

export type PlayerProps = VideoProps & {
  children?: React.ReactNode;
  fullscreen?: boolean;
  toggleFullscreen?: () => void;
};

export const Player = forwardRef<HTMLVideoElement, PlayerProps>(
  (props: PlayerProps, ref: Ref<HTMLVideoElement>) => {
    const {
      children,
      fullscreen,
      toggleFullscreen = () => undefined,
      ...videoProps
    } = props;
    const theme = useTheme();
    const video = useForwardedRef<HTMLVideoElement>(ref);
    const player = useRef<HTMLElement>(null);
    const timeline = useRef<HTMLDivElement>(null);
    const signalKey = useRef(0);
    const [signal, setSignalState] = useState("");
    const [loading, setLoading] = useState(false);
    const [dimensions, setDimensions] = useState<Dimensions>({
      width: 0,
      height: 0,
    });

    const [state, dispatch] = useReducer(
      (state: PlayerState, action: PlayerAction) => {
        switch (action.type) {
          case "activate":
            return {
              ...state,
              active: true,
              idletime: state.paused || state.scrubbing ? -Infinity : 0,
            };

          case "deactivate":
            return {
              ...state,
              active: state.paused || state.scrubbing,
              idletime: state.paused || state.scrubbing ? -Infinity : Infinity,
            };

          case "idle":
            return {
              ...state,
              active: state.idletime < 16,
              idletime: state.idletime + 1,
            };

          case "pause":
            return {
              ...state,
              active: true,
              idletime: -Infinity,
              playing: false,
              paused: true,
            };

          case "waiting":
            return {
              ...state,
              waiting: true,
            };

          case "playing":
            return {
              ...state,
              idletime: 0,
              playing: true,
              paused: false,
              stalled: false,
              waiting: false,
            };

          case "stalled":
            return {
              ...state,
              playing: false,
              stalled: true,
            };

          case "seeking":
            return {
              ...state,
              seeking: true,
            };

          case "seeked":
            return {
              ...state,
              seeking: false,
            };

          case "scrub":
            return {
              ...state,
              time: action.time,
              scrubbing: true,
            };

          case "noscrub":
            return {
              ...state,
              scrubbing: false,
            };

          case "timeupdate":
            return {
              ...state,
              time: state.scrubbing ? state.time : action.time,
            };

          case "progress":
            return {
              ...state,
              progress: action.progress,
            };

          case "hover":
            return {
              ...state,
              hovering: true,
              hover: action.position,
            };

          case "nohover":
            return {
              ...state,
              hovering: false,
            };

          case "ended":
            return {
              ...state,
              ended: true,
              playing: false,
              paused: false,
            };

          default:
            return state;
        }
      },
      {
        active: false,
        idletime: 0,
        time: 0,
        progress: 0,
        hover: 0,
        playing: false,
        paused: false,
        stalled: false,
        seeking: false,
        scrubbing: false,
        waiting: false,
        hovering: false,
        ended: false,
      }
    );

    const setSignal = useCallback((value) => {
      signalKey.current++;
      setSignalState(value);
    }, []);

    const findBufferIndex = useCallback((event) => {
      let index;
      let delta = Infinity;
      for (let i = 0; i < event.target.buffered.length; i++) {
        const x = event.target.buffered.end(i) - event.target.currentTime;
        if (x > 0 && x < delta) {
          index = i;
          delta = x;
        }
      }
      return index;
    }, []);

    const togglePlayback = useCallback(() => {
      if (state.paused) {
        video.current?.play();
        setSignal("play");
      } else {
        video.current?.pause();
        setSignal("pause");
      }
    }, [video, state.paused, setSignal]);

    const seekTo = useCallback(
      (time) => {
        if (video.current) {
          video.current.currentTime = time;
          dispatch({ type: "timeupdate", time: time / video.current.duration });
        }
      },
      [video]
    );

    const timelinePercent = useCallback((x: number) => {
      if (timeline.current) {
        const rect = timeline.current.getBoundingClientRect();
        return Math.min(Math.max(0, (x - rect.left) / rect.width), 1);
      } else {
        return 0;
      }
    }, []);

    const handleKeydown = useCallback(
      (event) => {
        switch ((event as any).key) {
          case " ":
            event.preventDefault();
            togglePlayback();
            return;

          case "f":
          case "F":
            toggleFullscreen();
            return;

          case "k":
          case "K":
            togglePlayback();
            return;

          case "ArrowRight":
            if (!video?.current) return;
            if (!state.seeking) setSignal("skipForward");
            seekTo(
              Math.min(video.current.currentTime + 5, video.current.duration)
            );
            return;

          case "ArrowLeft":
            if (!video?.current) return;
            if (!state.seeking) setSignal("skipBackward");
            seekTo(Math.max(video.current.currentTime - 5, 0));
            return;
        }
      },
      [
        video,
        state.seeking,
        seekTo,
        setSignal,
        togglePlayback,
        toggleFullscreen,
      ]
    );

    useResizeObserver(player, (content) =>
      setDimensions({ width: content.inlineSize, height: content.blockSize })
    );

    useEffect(() => {
      const id = setTimeout(() => setSignal(""), 700);
      return () => clearTimeout(id);
    }, [signal, setSignal]);

    useEffect(() => {
      if (state.waiting) {
        const id = setTimeout(() => setLoading(true), 200);
        return () => clearTimeout(id);
      } else {
        setLoading(false);
      }
    }, [state.waiting]);

    useEffect(() => {
      const id = setInterval(() => dispatch({ type: "idle" }), 250);
      return () => clearInterval(id);
    }, []);

    const videoEvents = {
      onPause: useCallback(() => dispatch({ type: "pause" }), []),
      onPlaying: useCallback(() => dispatch({ type: "playing" }), []),
      onStalled: useCallback(() => dispatch({ type: "stalled" }), []),
      onSeeking: useCallback(() => dispatch({ type: "seeking" }), []),
      onWaiting: useCallback(() => dispatch({ type: "waiting" }), []),
      onEnded: useCallback(() => dispatch({ type: "ended" }), []),
      onTimeUpdate: useCallback((event) => {
        const target = event.target as HTMLMediaElement;
        dispatch({
          type: "timeupdate",
          time: target.currentTime / target.duration,
        });
      }, []),
      onProgress: useCallback(
        (event) => {
          const target = event.target as HTMLMediaElement;
          const index = findBufferIndex(event);
          const progress =
            (index !== undefined && target.buffered.end(index)) || 0;
          dispatch({ type: "progress", progress: progress / target.duration });
        },
        [findBufferIndex]
      ),
      onSeeked: useCallback(
        (event) => {
          const target = event.target as HTMLMediaElement;
          const index = findBufferIndex(event);
          const progress =
            (index !== undefined && target.buffered.end(index)) || 0;
          dispatch({ type: "seeked" });
          dispatch({ type: "progress", progress: progress / target.duration });
        },
        [findBufferIndex]
      ),
    };

    const timelineEvents = {
      onClick: useCallback((event) => event.stopPropagation(), []),
      onPointerDown: useCallback(
        (event) => {
          event.preventDefault();
          timeline.current?.setPointerCapture((event as any).pointerId);
          const time = timelinePercent((event as any).clientX);
          dispatch({ type: "scrub", time });
        },
        [timelinePercent]
      ),
      onPointerUp: useCallback(
        (event) => {
          if (video.current && state.scrubbing) {
            timeline.current?.releasePointerCapture((event as any).pointerId);
            const time = timelinePercent((event as any).clientX);
            seekTo(video.current.duration * time);
            dispatch({ type: "nohover" });
            dispatch({ type: "noscrub" });
          }
        },
        [video, state.scrubbing, seekTo, timelinePercent]
      ),
      onPointerEnter: useCallback(
        (event) => {
          const position = timelinePercent((event as any).clientX);
          dispatch({ type: "hover", position });
        },
        [timelinePercent]
      ),
      onPointerMove: useCallback(
        (event) => {
          const position = timelinePercent((event as any).clientX);
          dispatch({ type: "hover", position });
          if (state.scrubbing) {
            dispatch({ type: "scrub", time: position });
          }
        },
        [state.scrubbing, timelinePercent]
      ),
      onPointerLeave: useCallback(() => {
        if (!state.scrubbing) {
          dispatch({ type: "nohover" });
        }
      }, [state.scrubbing]),
    };

    const playerEvents = {
      onClick: useCallback(() => {
        if (!state.scrubbing) {
          togglePlayback();
        }
      }, [state.scrubbing, togglePlayback]),
      onPointerDown: useCallback(() => dispatch({ type: "activate" }), []),
      onPointerMove: useCallback(() => dispatch({ type: "activate" }), []),
      onPointerLeave: useCallback(() => dispatch({ type: "deactivate" }), []),
    };

    const signalProps = {
      w: "52px",
      padding: "32px",
      bg: theme.colors.black,
      fg: theme.colors.white,
    };

    const loadingBoxProps = {
      style: { transform: "rotate(-65deg)" },
      w: "116px",
      h: "116px",
      rounded: 1,
    };

    const timelineProps = {
      ref: timeline,
      time: state.time,
      progress: state.progress,
      position: state.hover,
      active: state.hovering,
      duration: video.current?.duration ?? 0,
      ...timelineEvents,
    };

    const controlsBoxProps = {
      absolute: true,
      left: "20px",
      right: "20px",
      bottom: "0px",
      onClick: (event: React.SyntheticEvent) => event.stopPropagation(),
    };

    const controlsProps = {
      paused: state.paused,
      position: state.time,
      duration: video.current?.duration ?? 0,
      togglePlayback,
      toggleFullscreen,
      fullscreen,
    };

    const overlayProps = {
      expand: true,
      active: state.active,
      duration: 200,
    };

    const viewportProps = {
      ref: player,
      h: fullscreen ? "100vh" : "calc((9 / 16) * 100vw)",
      maxh: fullscreen ? "none" : "calc(100vh - 140px)",
      minh: "480px",
      aspectRatio: dimensions.height / dimensions.width,
      ...playerEvents,
    };

    const getIconMarkup = () => {
      switch (signal) {
        case "play":
          return (
            <Box style={{ transform: "translateX(2px)" }}>
              <Icon src={Play} padding="4px" />
            </Box>
          );

        case "pause":
          return <Icon src={Pause} padding="4px" />;

        case "skipBackward":
          return <Icon src={SkipBackward} />;

        case "skipForward":
          return <Icon src={SkipForward} />;

        default:
          return null;
      }
    };

    const SignalMarkup = signal ? (
      <Box key={signalKey.current} absolute expand>
        <Flex expand center>
          <Signal {...signalProps}>{getIconMarkup()}</Signal>
        </Flex>
      </Box>
    ) : null;

    const LoadingMarkup =
      loading && !signal ? (
        <Box absolute expand>
          <Flex center expand>
            <Box {...loadingBoxProps}>
              <Icon src={Spinner} />
            </Box>
          </Flex>
        </Box>
      ) : null;

    const TimelineMarkup = (
      <Box absolute left="20px" right="20px" bottom="40px">
        <Timeline {...timelineProps} />
      </Box>
    );

    const ControlsMarkup = (
      <Box {...controlsBoxProps}>
        <Controls {...controlsProps} />
      </Box>
    );

    const OverlayMarkup = (
      <>
        {SignalMarkup}
        {LoadingMarkup}
        <Activatable css={cssCursorVisibility(!state.active)} {...overlayProps}>
          <Box absolute expand>
            <Shading expand />
            {ControlsMarkup}
            {TimelineMarkup}
          </Box>
        </Activatable>
      </>
    );

    return (
      <Viewport overlay={OverlayMarkup} {...viewportProps}>
        <Flex center h={1}>
          <Video ref={video} {...videoEvents} {...videoProps}>
            {children}
          </Video>
        </Flex>
        <EventListener event="keydown" handler={handleKeydown} />
      </Viewport>
    );
  }
);
