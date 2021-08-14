import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from '@gatsby-tv/types';

export type SessionState = {
  user?: User;
  token?: string;
  loading: boolean;
  valid: boolean;
};

export type SessionContextType = {
  session: SessionState;
  setSession: Dispatch<SetStateAction<string | undefined>>;
  mutate: <T>(value?: T) => T;
};

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);
