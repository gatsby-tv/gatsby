import { createContext, Dispatch } from 'react';
import { User } from '@gatsby-tv/types';

export type SessionState = {
  user?: User;
  token?: string;
  loading: boolean;
  valid: boolean;
};

export type SessionAction =
  | string
  | undefined
  | ((prevState: SessionState) => string | undefined);

export type SessionContextType = {
  session: SessionState;
  setSession: Dispatch<SessionAction>;
  mutate: <T>(value?: T) => T;
};

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);
