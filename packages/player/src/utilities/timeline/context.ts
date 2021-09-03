import { createContext, RefObject } from 'react';

export type TimelineContextType = {
  ref: RefObject<HTMLDivElement>;
  scrubbing: boolean;
  position: number;
  events: Record<string, (event: any) => void>;
};

export const TimelineContext = createContext<TimelineContextType | undefined>(
  undefined
);
