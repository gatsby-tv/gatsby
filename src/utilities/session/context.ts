import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '@gatsby-tv/types';

export type SessionContextType = [
  {
    user?: User;
    token?: string;
    loading: boolean;
    valid: boolean;
  },
  Dispatch<SetStateAction<string | undefined>>
];

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);
