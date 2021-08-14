import {
  useContext,
  useRef,
  useEffect,
  useReducer,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import jwt from 'jsonwebtoken';
import { ContextError } from '@gatsby-tv/utilities';
import { User, GetAuthTokenRefreshResponse } from '@gatsby-tv/types';

import { fetcher } from '@src/utilities/fetcher';

import { SessionContext, SessionContextType, SessionState } from './context';

type SessionAction =
  | { type: 'submit'; token?: string }
  | { type: 'accept'; token: string }
  | { type: 'reject' };

export function useSessionContext(): SessionContextType {
  const state = useRef<SessionState>({
    user: undefined,
    token: undefined,
    loading: true,
    valid: false,
  });

  const [session, dispatch] = useReducer(
    (state: SessionState, action: SessionAction) => {
      switch (action.type) {
        case 'submit':
          if (action.token) {
            return {
              ...state,
              user: jwt.decode(action.token) as User,
              token: action.token,
              loading: true,
            };
          } else {
            window.localStorage.removeItem('session');
            return {
              ...state,
              user: undefined,
              token: undefined,
              loading: false,
              valid: false,
            };
          }

        case 'accept':
          window.localStorage.setItem('session', action.token);
          return {
            ...state,
            user: jwt.decode(action.token) as User,
            token: action.token,
            loading: false,
            valid: true,
          };

        case 'reject':
          window.localStorage.removeItem('session');
          return {
            ...state,
            user: undefined,
            token: undefined,
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

  useEffect(() => void (state.current = session), [session]);

  useEffect(() => {
    const token = window.localStorage.getItem('session') ?? undefined;
    dispatch({ type: 'submit', token });
  }, []);

  useEffect(() => {
    if (!session.token) return;

    fetcher<GetAuthTokenRefreshResponse>('/auth/token/refresh', session.token)
      .then((resp) => {
        if (resp.ok) return resp;
        throw resp;
      })
      .then((resp) => resp.json())
      .then((resp) =>
        dispatch({
          type: 'accept',
          token: (resp as { token: string }).token,
        })
      )
      .catch(() => dispatch({ type: 'reject' }));
  }, [session.token]);

  const setSession = useCallback((value) => {
    const token = typeof value === 'function' ? value(state.current) : value;
    dispatch({ type: 'submit', token });
  }, []);

  const mutate = useCallback((value) => {
    if (!state.current.token) return value;

    fetcher<GetAuthTokenRefreshResponse>(
      '/auth/token/refresh',
      state.current.token
    )
      .then((resp) => {
        if (resp.ok) return resp;
        throw resp;
      })
      .then((resp) => resp.json())
      .then((resp) =>
        dispatch({
          type: 'accept',
          token: (resp as { token: string }).token,
        })
      )
      .catch(() => dispatch({ type: 'reject' }));

    return value;
  }, []);

  return { session, setSession, mutate };
}

export function useSession(): SessionContextType {
  const context = useContext(SessionContext);

  if (!context) {
    throw new ContextError('Session');
  }

  return context;
}
