import { createContext, Dispatch, SetStateAction, ReactNode } from 'react';

export type SnackBarConfig =
  | ReactNode
  | Promise<ReactNode>
  | {
      content: ReactNode | Promise<ReactNode>;
      duration?: number;
    };

export type SnackBarContextType = {
  active: boolean;
  config: SnackBarConfig;
  setConfig: Dispatch<SetStateAction<SnackBarConfig | undefined>>;
};

export const SnackBarContext = createContext<SnackBarContextType | undefined>(
  undefined
);
