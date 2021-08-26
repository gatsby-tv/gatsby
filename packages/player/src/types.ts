import { Dispatch, SetStateAction, ReactNode, ReactElement } from 'react';
import { VideoProps } from '@gatsby-tv/components';

import { PlayerState } from '@src/utilities/use-player';
import { TimelineState } from '@src/utilities/use-timeline';

export interface PlayerProps extends VideoProps {
  children?: ReactNode;
  fullscreen?: boolean;
  levels?: Record<number, number>;
  quality?: number;
  volume?: number;
  setFullscreen?: Dispatch<SetStateAction<boolean>>;
  setQuality?: Dispatch<SetStateAction<number>>;
}

export interface OverlayProps {
  player: PlayerState;
  timeline: TimelineState;
  signal?: string;
  levels: Record<number, number>;
  quality: number;
  fullscreen: boolean;
  setFullscreen: Dispatch<SetStateAction<boolean>>;
  setQuality: Dispatch<SetStateAction<number>>;
  setActive: Dispatch<SetStateAction<boolean>>;
  setPinned: Dispatch<SetStateAction<boolean>>;
  setSuspend: Dispatch<SetStateAction<boolean>>;
  setPlayback: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  setMuted: Dispatch<SetStateAction<boolean>>;
  setSeek: Dispatch<SetStateAction<number>>;
  setSignal: Dispatch<SetStateAction<string | undefined>>;
}
