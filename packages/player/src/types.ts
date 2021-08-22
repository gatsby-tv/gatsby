import { Dispatch, SetStateAction, ReactNode, ReactElement } from 'react';
import { VideoProps } from '@gatsby-tv/components';

import { PlayerState } from '@src/utilities/use-player';
import { TimelineState } from '@src/utilities/use-timeline';

export interface PlayerProps extends VideoProps {
  children?: ReactNode;
  fullscreen?: boolean;
  volume?: number;
  setFullscreen?: Dispatch<SetStateAction<boolean>>;
}

export interface OverlayProps {
  player: PlayerState;
  timeline: TimelineState;
  signal?: string;
  fullscreen?: boolean;
  setFullscreen: Dispatch<SetStateAction<boolean>>;
  setActive: Dispatch<SetStateAction<boolean>>;
  setPinned: Dispatch<SetStateAction<boolean>>;
  setSuspend: Dispatch<SetStateAction<boolean>>;
  setPlayback: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<number>>;
  setMuted: Dispatch<SetStateAction<boolean>>;
  setSeek: Dispatch<SetStateAction<number>>;
  setSignal: Dispatch<SetStateAction<string | undefined>>;
}
