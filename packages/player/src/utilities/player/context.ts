import { createContext, RefObject, Dispatch, SetStateAction } from 'react';

export type VideoState = {
  active: boolean;
  pinned: boolean;
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

export type PlayerState = VideoState & {
  ref: RefObject<HTMLElement>;
  loading: boolean;
  duration: number;
};

export type PlayerContextType = {
  player: PlayerState;
  setActive: Dispatch<SetStateAction<boolean>>;
  setPinned: Dispatch<SetStateAction<boolean>>;
  setPlayback: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  setMuted: Dispatch<SetStateAction<boolean>>;
  setSeek: Dispatch<SetStateAction<number>>;
  events: Record<string, (event: any) => void>;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);
