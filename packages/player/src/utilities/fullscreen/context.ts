import { createContext, Dispatch, SetStateAction } from 'react';

export type FullscreenContextType = [
  fullscreen: boolean,
  setFullscreen: Dispatch<SetStateAction<boolean>>
];

export const FullscreenContext = createContext<
  FullscreenContextType | undefined
>(undefined);
