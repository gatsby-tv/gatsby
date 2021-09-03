import { createContext, Dispatch, SetStateAction } from 'react';

export type QualityContextType = {
  levels: Record<number, number>;
  quality: number;
  setQuality: Dispatch<SetStateAction<number>>;
};

export const QualityContext = createContext<QualityContextType | undefined>(
  undefined
);
