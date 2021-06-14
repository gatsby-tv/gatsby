import {
  useContext,
  useEffect,
  useReducer,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import jwt from 'jsonwebtoken';
import { ifExists } from '@gatsby-tv/utilities';
import { User, GetAuthTokenRefreshResponse } from '@gatsby-tv/types';

import { fetcher } from '@src/utilities/fetcher';

import { SessionContext, SessionContextType } from './context';

export type SessionState = {
  user?: User;
  token?: string;
  loading: boolean;
  valid: boolean;
};
export type SessionAction =
  | { type: 'submit'; token?: string }
  | { type: 'accept'; token: string }
  | { type: 'reject' };

export function useSessionContext(): SessionContextType {
  const [state, dispatch] = useReducer(
    (state: SessionState, action: SessionAction) => {
      switch (action.type) {
        case 'submit':
          if (action.token) {
            return {
              ...state,
              token: action.token,
              user: jwt.decode(action.token) as User,
              loading: true,
            };
          } else {
            window.localStorage.removeItem('session');
            return {
              ...state,
              token: undefined,
              user: undefined,
              loading: false,
              valid: false,
            };
          }

        case 'accept':
          window.localStorage.setItem('session', action.token);
          return {
            ...state,
            token: action.token,
            user: jwt.decode(action.token) as User,
            loading: false,
            valid: true,
          };

        case 'reject':
          window.localStorage.removeItem('session');
          return {
            ...state,
            token: undefined,
            user: undefined,
            loading: false,
            valid: false,
          };
      }
    },
    {
      user: undefined,
      token: undefined,
      loading: true,
      valid: false,
    }
  );

  const setSession = useCallback(
    (value) => {
      const token = typeof value === 'function' ? value(state) : value;
      dispatch({ type: 'submit', token });
    },
    [state]
  );

  useEffect(() => {
    const token = window.localStorage.getItem('session') ?? undefined;
    dispatch({ type: 'submit', token });
  }, []);

  useEffect(() => {
    if (state.token) {
      fetcher<GetAuthTokenRefreshResponse>('/auth/token/refresh', state.token)
        .then((resp) => dispatch({ type: 'accept', token: resp.token }))
        .catch((err) => dispatch({ type: 'reject' }));
    }
  }, [state.token]);

  return [state, setSession];
}

export function useSession(): SessionContextType {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('Session context is missing for component.');
  }

  return context;
}
