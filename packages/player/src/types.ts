import { ReactNode, ReactElement, Dispatch, SetStateAction } from "react";
import { VideoProps } from "@gatsby-tv/components";

export type PlayerProps = VideoProps & {
  children?: ReactNode;
  fullscreen?: boolean;
  setFullscreen?: Dispatch<SetStateAction<boolean>>;
};

export type ControlsProps = {
  paused?: boolean;
  loading?: boolean;
  fullscreen?: boolean;
  time: number;
  duration: number;
  prevVideo?: unknown;
  nextVideo?: unknown;
  playlist?: unknown;
  setPlayback: Dispatch<SetStateAction<boolean>>;
  setFullscreen: Dispatch<SetStateAction<boolean>>;
  setSeek: Dispatch<SetStateAction<number>>;
  setSignal: Dispatch<SetStateAction<string | undefined>>;
};

export type TimelineProps = {
  active?: boolean;
  scrubbing: boolean;
  position: number;
  time: number;
  progress: number;
  duration: number;
  onSeek: (value: number) => void;
};

export type OverlayProps = {
  active?: boolean;
  scrubbing?: boolean;
  loading?: boolean;
  fullscreen?: boolean;
  signal?: string;
  controls: ReactElement;
  timeline: ReactElement;
};
