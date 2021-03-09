import {
  useReducer,
  useRef,
  useState,
  useEffect,
  useCallback,
  Reducer,
  ReducerState,
  ReducerAction,
  SetStateAction,
  Dispatch,
  RefObject,
} from "react";
import { useResizeObserver } from "@gatsby-tv/utilities";

export type VideoAction =
  | { type: "activate" }
  | { type: "deactivate" }
  | { type: "idle" }
  | { type: "pause" }
  | { type: "waiting" }
  | { type: "playing" }
  | { type: "stalled" }
  | { type: "seeking" }
  | { type: "seeked" }
  | { type: "timeupdate"; time: number }
  | { type: "progress"; progress: number }
  | { type: "ended" };

export type VideoState = {
  active: boolean;
  idletime: number;
  playing: boolean;
  paused: boolean;
  stalled: boolean;
  seeking: boolean;
  waiting: boolean;
  time: number;
  progress: number;
  ended: boolean;
};

export type VideoDimensions = {
  width: number;
  height: number;
};

export type VideoReducer = Reducer<VideoState, VideoAction>;

function bufferProgress(time: number, ranges: TimeRanges): number {
  let index;
  let delta = Infinity;
  for (let i = 0; i < ranges.length; i++) {
    const x = ranges.end(i) - time;
    if (x > 0 && x < delta) {
      index = i;
      delta = x;
    }
  }

  return (index !== undefined && ranges.end(index)) || 0;
}

export function useVideo(
  video: RefObject<HTMLVideoElement | null>
): {
  player: VideoState & {
    ref: RefObject<HTMLElement>;
    loading: boolean;
    duration: number;
    dimensions: VideoDimensions;
  };
  setActive: Dispatch<SetStateAction<boolean>>;
  setPlayback: Dispatch<SetStateAction<boolean>>;
  setSeek: Dispatch<SetStateAction<number>>;
} {
  const ref = useRef<HTMLElement>(null);
  const active = useRef(false);
  const playing = useRef(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [state, dispatch] = useReducer(
    (state: VideoState, action: VideoAction) => {
      const isPinned = state.paused || state.seeking || state.ended;
      switch (action.type) {
        case "activate":
          return {
            ...state,
            active: true,
            idletime: isPinned ? -Infinity : 0,
          };

        case "deactivate":
          return {
            ...state,
            active: isPinned,
            idletime: isPinned ? -Infinity : Infinity,
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
          // The player by default remains inactive until explicitly
          // activated, so we use NaN here to prevent the player from
          // activating when the video initially begins.
          return {
            ...state,
            idletime: isNaN(state.idletime) ? NaN : 0,
            playing: true,
            paused: false,
            stalled: false,
            waiting: false,
            ended: false,
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

        case "timeupdate":
          return {
            ...state,
            time: action.time,
          };

        case "progress":
          return {
            ...state,
            progress: action.progress,
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
      idletime: NaN,
      time: 0,
      progress: 0,
      playing: false,
      paused: false,
      stalled: false,
      seeking: false,
      waiting: false,
      ended: false,
    }
  );

  const setActive: Dispatch<SetStateAction<boolean>> = useCallback((value) => {
    const update = typeof value === "function" ? value(active.current) : value;
    if (update) {
      dispatch({ type: "activate" });
    } else {
      dispatch({ type: "deactivate" });
    }
  }, []);

  const setPlayback: Dispatch<SetStateAction<boolean>> = useCallback(
    (value) => {
      if (!video.current) return;
      const playback =
        typeof value === "function" ? value(playing.current) : value;
      if (playback === playing.current) return;
      if (playing.current) {
        video.current.pause();
      } else {
        video.current.play();
      }
    },
    []
  );

  const setSeek: Dispatch<SetStateAction<number>> = useCallback((value) => {
    if (!video.current) return;
    const current = video.current.currentTime;
    const duration = video.current.duration;
    if (!duration) return;
    const time =
      typeof value === "function"
        ? Math.min(Math.max(value(current), 0), duration)
        : Math.min(Math.max(value * duration, 0), duration);
    video.current.currentTime = time;

    // Although the video element will emit this event soon, we
    // programmatically dispatch this update to support logic that
    // needs to be notified as soon as possible; e.g. this allows
    // `setSeek` to refresh the player's activation state (see the
    // handling of the "activate" and "deactivate" actions above).
    dispatch({ type: "seeking" });
    dispatch({ type: "timeupdate", time: time / duration });
  }, []);

  useResizeObserver(ref, (content) =>
    setDimensions({ width: content.inlineSize, height: content.blockSize })
  );

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "idle" }), 250);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    active.current = state.active;
  }, [state.active]);

  useEffect(() => {
    playing.current = state.playing;
  }, [state.playing]);

  useEffect(() => {
    if (state.waiting) {
      const id = setTimeout(() => setLoading(true), 200);
      return () => clearTimeout(id);
    } else {
      setLoading(false);
    }
  }, [state.waiting]);

  useEffect(() => {
    if (!video.current || duration) return;
    setDuration(isNaN(video.current.duration) ? 0 : video.current.duration);
  });

  useEffect(() => {
    const onContextMenu = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (ref.current) {
      ref.current.addEventListener("contextmenu", onContextMenu);

      return () => {
        if (ref.current) {
          ref.current.removeEventListener("contextmenu", onContextMenu);
        }
      };
    }
  }, []);

  useEffect(() => {
    const onPause = () => dispatch({ type: "pause" });
    const onPlaying = () => dispatch({ type: "playing" });
    const onStalled = () => dispatch({ type: "stalled" });
    const onSeeking = () => dispatch({ type: "seeking" });
    const onWaiting = () => dispatch({ type: "waiting" });
    const onEnded = () => dispatch({ type: "ended" });
    const onTimeUpdate = (event: any) => {
      const target = event.target as HTMLMediaElement;
      if (!target.duration) return;
      dispatch({
        type: "timeupdate",
        time: target.currentTime / target.duration,
      });
    };
    const onProgress = (event: any) => {
      const target = event.target as HTMLMediaElement;
      if (!target.duration) return;
      const progress = bufferProgress(target.currentTime, target.buffered);
      dispatch({ type: "progress", progress: progress / target.duration });
    };
    const onSeeked = (event: any) => {
      const target = event.target as HTMLMediaElement;
      if (!target.duration) return;
      const progress = bufferProgress(target.currentTime, target.buffered);
      dispatch({ type: "seeked" });
      dispatch({ type: "progress", progress: progress / target.duration });
    };

    if (video.current) {
      video.current.addEventListener("pause", onPause);
      video.current.addEventListener("playing", onPlaying);
      video.current.addEventListener("stalled", onStalled);
      video.current.addEventListener("seeking", onSeeking);
      video.current.addEventListener("waiting", onWaiting);
      video.current.addEventListener("ended", onEnded);
      video.current.addEventListener("timeupdate", onTimeUpdate);
      video.current.addEventListener("progress", onProgress);
      video.current.addEventListener("seeked", onSeeked);

      return () => {
        if (video.current) {
          video.current.removeEventListener("pause", onPause);
          video.current.removeEventListener("playing", onPlaying);
          video.current.removeEventListener("stalled", onStalled);
          video.current.removeEventListener("seeking", onSeeking);
          video.current.removeEventListener("waiting", onWaiting);
          video.current.removeEventListener("ended", onEnded);
          video.current.removeEventListener("timeupdate", onTimeUpdate);
          video.current.removeEventListener("progress", onProgress);
          video.current.removeEventListener("seeked", onSeeked);
        }
      };
    }
  }, []);

  return {
    player: { ref, loading, duration, dimensions, ...state },
    setActive,
    setPlayback,
    setSeek,
  };
}
