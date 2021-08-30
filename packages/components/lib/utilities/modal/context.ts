import { createContext } from 'react';

import { EventHandler } from '@lib/types';

export type ModalContextType = {
  addModalCallback: (handler: EventHandler) => void;
  removeModalCallback: (handler: EventHandler) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
