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
} from 'react';

export type VideoAction =
  | { type: 'activate' }
  | { type: 'deactivate' }
  | { type: 'idle' }
  | { type: 'pin' }
  | { type: 'unpin' }
  | { type: 'suspend' }
  | { type: 'unsuspend' }
  | { type: 'pause' }
  | { type: 'waiting' }
  | { type: 'playing' }
  | { type: 'stalled' }
  | { type: 'seeking' }
  | { type: 'seeked' }
  | { type: 'timeupdate'; time: number }
  | { type: 'progress'; progress: number }
  | { type: 'ended' }
  | { type: 'volumechange'; volume: number }
  | { type: 'mute' }
  | { type: 'unmute' };

export type VideoState = {
  active: boolean;
  pinned: boolean;
  suspended: boolean;
  idle: number;
  playing: boolean;
  paused: boolean;
  stalled: boolean;
  seeking: boolean;
  waiting: boolean;
  time: number;
  progress: number;
  ended: boolean;
  volume: number;
  muted: boolean;
};

export type VideoReducer = Reducer<VideoState, VideoAction>;

export type PlayerState = VideoState & {
  ref: RefObject<HTMLElement>;
  loading: boolean;
  duration: number;
};

function Progress(time: number, ranges: TimeRanges): number {
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

export function usePlayer(
  video: RefObject<HTMLVideoElement | null>,
  volume: number
): {
  player: PlayerState;
  setActive: Dispatch<SetStateAction<boolean>>;
  setPinned: Dispatch<SetStateAction<boolean>>;
  setSuspend: Dispatch<SetStateAction<boolean>>;
  setPlayback: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  setMuted: Dispatch<SetStateAction<boolean>>;
  setSeek: Dispatch<SetStateAction<number>>;
  events: Record<string, (event: any) => void>;
} {
  const ref = useRef<HTMLElement>(null);
  const active = useRef(false);
  const pinned = useRef(false);
  const suspended = useRef(true);
  const playing = useRef(false);
  const ended = useRef(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);

  const [state, dispatch] = useReducer(
    (state: VideoState, action: VideoAction) => {
      const isPinned =
        state.pinned || state.paused || state.seeking || state.ended;

      switch (action.type) {
        case 'idle':
          return {
            ...state,
            active: state.suspended ? state.active : state.idle < 16,
            idle: state.idle + 1,
          };

        case 'activate':
          return {
            ...state,
            active: true,
            suspended: false,
            idle: isPinned ? -Infinity : 0,
          };

        case 'deactivate':
          return {
            ...state,
            active: isPinned,
            idle: isPinned ? -Infinity : Infinity,
          };

        case 'pin':
          return {
            ...state,
            active: true,
            pinned: true,
            suspended: false,
            idle: -Infinity,
          };

        case 'unpin':
          return {
            ...state,
            active: true,
            pinned: false,
            suspended: false,
            idle: 0,
          };

        case 'suspend':
          return {
            ...state,
            suspended: true,
          };

        case 'unsuspend':
          return {
            ...state,
            suspended: false,
            idle: isPinned ? -Infinity : state.active ? 0 : Infinity,
          };

        case 'pause':
          return {
            ...state,
            active: true,
            suspended: false,
            idle: -Infinity,
            playing: false,
            paused: true,
          };

        case 'waiting':
          return {
            ...state,
            waiting: true,
          };

        case 'playing':
          return {
            ...state,
            idle: 0,
            playing: true,
            paused: false,
            stalled: false,
            waiting: false,
            ended: false,
          };

        case 'stalled':
          return {
            ...state,
            playing: false,
            stalled: true,
          };

        case 'seeking':
          return {
            ...state,
            seeking: true,
          };

        case 'seeked':
          return {
            ...state,
            seeking: false,
          };

        case 'timeupdate':
          return {
            ...state,
            time: action.time,
          };

        case 'progress':
          return {
            ...state,
            progress: action.progress,
          };

        case 'ended':
          return {
            ...state,
            ended: true,
            playing: false,
            paused: false,
          };

        case 'volumechange':
          return {
            ...state,
            volume: action.volume,
          };

        case 'mute':
          return {
            ...state,
            muted: true,
          };

        case 'unmute':
          return {
            ...state,
            muted: false,
          };

        default:
          return state;
      }
    },
    {
      idle: 0,
      active: false,
      pinned: false,
      suspended: true,
      time: 0,
      progress: 0,
      playing: false,
      paused: false,
      stalled: false,
      seeking: false,
      waiting: false,
      ended: false,
      volume,
      muted: true,
    }
  );

  const setActive = useCallback((value: SetStateAction<boolean>) => {
    const update = typeof value === 'function' ? value(active.current) : value;
    dispatch({ type: update ? 'activate' : 'deactivate' });
  }, []);

  const setPinned = useCallback((value: SetStateAction<boolean>) => {
    const update = typeof value === 'function' ? value(pinned.current) : value;
    dispatch({ type: update ? 'pin' : 'unpin' });
  }, []);

  const setSuspend = useCallback((value: SetStateAction<boolean>) => {
    const update =
      typeof value === 'function' ? value(suspended.current) : value;
    dispatch({ type: update ? 'suspend' : 'unsuspend' });
  }, []);

  const setPlayback = useCallback((value: SetStateAction<boolean>) => {
    if (!video.current) return;

    const playback =
      typeof value === 'function' ? value(playing.current) : value;

    if (playback === playing.current) return;

    playing.current
      ? video.current.pause()
      : video.current.play().catch(console.error);
  }, []);

  const setVolume = useCallback((value: SetStateAction<number>) => {
    if (!video.current) return;
    const current = video.current.volume;

    const volume =
      typeof value === 'function'
        ? Math.min(Math.max(value(current), 0), 1)
        : Math.min(Math.max(value, 0), 1);

    video.current.volume = volume;
    dispatch({ type: 'volumechange', volume });
    setMuted(!volume);
  }, []);

  const setMuted = useCallback((value: SetStateAction<boolean>) => {
    if (!video.current) return;
    const current = video.current.muted;
    const update = typeof value === 'function' ? value(current) : value;
    if (update === current) return;
    video.current.muted = update;
    dispatch({ type: update ? 'mute' : 'unmute' });
  }, []);

  const setSeek = useCallback((value: SetStateAction<number>) => {
    if (!video.current) return;
    const current = video.current.currentTime;
    const duration = video.current.duration;
    if (!duration) return;

    const time =
      typeof value === 'function'
        ? Math.min(Math.max(value(current), 0), duration)
        : Math.min(Math.max(value * duration, 0), duration);

    video.current.currentTime = time;
    if (ended.current) video.current.play().catch(console.error);

    // Although the video element will emit this event soon, we
    // programmatically dispatch this update to support logic that
    // needs to be notified as soon as possible; e.g. this allows
    // `setSeek` to refresh the player's activation state (see the
    // handling of the "activate" and "deactivate" actions above).
    dispatch({ type: 'seeking' });
    dispatch({ type: 'timeupdate', time: time / duration });
  }, []);

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: 'idle' }), 250);
    return () => clearInterval(id);
  }, []);

  useEffect(() => void (active.current = state.active), [state.active]);
  useEffect(() => void (pinned.current = state.pinned), [state.pinned]);
  useEffect(
    () => void (suspended.current = state.suspended),
    [state.suspended]
  );
  useEffect(() => void (playing.current = state.playing), [state.playing]);
  useEffect(() => void (ended.current = state.ended), [state.ended]);

  useEffect(() => {
    if (!state.waiting) return void setLoading(false);
    const id = setTimeout(() => setLoading(true), 200);
    return () => clearTimeout(id);
  }, [state.waiting]);

  useEffect(() => {
    if (!video.current || duration) return;
    setDuration(isNaN(video.current.duration) ? 0 : video.current.duration);
  });

  useEffect(() => {
    if (!video.current) return;
    dispatch({ type: video.current.muted ? 'mute' : 'unmute' });
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const onContextMenu = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };

    ref.current.addEventListener('contextmenu', onContextMenu);
    return () => ref.current?.removeEventListener('contextmenu', onContextMenu);
  }, []);

  const onPause = useCallback(() => dispatch({ type: 'pause' }), []);
  const onPlaying = useCallback(() => dispatch({ type: 'playing' }), []);
  const onStalled = useCallback(() => dispatch({ type: 'stalled' }), []);
  const onSeeking = useCallback(() => dispatch({ type: 'seeking' }), []);
  const onWaiting = useCallback(() => dispatch({ type: 'waiting' }), []);
  const onEnded = useCallback(() => dispatch({ type: 'ended' }), []);

  const onTimeUpdate = useCallback((event: any) => {
    const target = event.target as HTMLMediaElement;
    if (!target.duration) return;

    dispatch({
      type: 'timeupdate',
      time: target.currentTime / target.duration,
    });
  }, []);

  const onProgress = useCallback((event: any) => {
    const target = event.target as HTMLMediaElement;
    if (!target.duration) return;
    const progress = Progress(target.currentTime, target.buffered);
    dispatch({ type: 'progress', progress: progress / target.duration });
  }, []);

  const onSeeked = useCallback((event: any) => {
    const target = event.target as HTMLMediaElement;
    if (!target.duration) return;
    const progress = Progress(target.currentTime, target.buffered);
    dispatch({ type: 'seeked' });
    dispatch({ type: 'progress', progress: progress / target.duration });
  }, []);

  return {
    player: {
      ref,
      loading,
      duration,
      ...state,
    },
    setActive,
    setPinned,
    setSuspend,
    setPlayback,
    setVolume,
    setMuted,
    setSeek,
    events: {
      onPause,
      onPlaying,
      onStalled,
      onSeeking,
      onWaiting,
      onEnded,
      onTimeUpdate,
      onProgress,
      onSeeked,
    },
  };
}
