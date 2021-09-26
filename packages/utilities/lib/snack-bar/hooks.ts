import {
  useContext,
  useEffect,
  useRef,
  useState,
  useReducer,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

import { ContextError } from '@lib/errors';

import {
  SnackBarConfig,
  SnackBarContext,
  SnackBarContextType,
} from './context';

type SnackBarRawConfig = {
  content: ReactNode | Promise<ReactNode>;
  duration?: number;
};

type SnackBarConfigState = {
  active: boolean;
  config: SnackBarConfig;
};

type SnackBarState = {
  active: boolean;
  content: ReactNode | Promise<ReactNode>;
};

type SnackBarAction =
  | { type: 'set'; config: SnackBarConfig }
  | { type: 'clear' }
  | { type: 'deactivate' };

export function useSnackBarContext(): SnackBarContextType {
  const configRef = useRef<SnackBarConfig>();
  const [, setCancel] = useState<(() => void) | undefined>(undefined);

  const [{ config, active }, dispatch] = useReducer(
    (state: SnackBarConfigState, action: SnackBarAction) => {
      switch (action.type) {
        case 'set':
          return {
            ...state,
            config: action.config,
            active: Boolean(action.config),
          };

        case 'clear':
          return { ...state, config: undefined, active: false };

        case 'deactivate':
          return { ...state, active: false };
      }
    },
    {
      active: false,
      config: undefined,
    }
  );

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    if (active) return;
    const id = setTimeout(() => dispatch({ type: 'clear' }), 300);
    return () => clearTimeout(id);
  }, [active]);

  useEffect(() => {
    if (!config) return;

    const current = (config as SnackBarRawConfig).content
      ? (config as SnackBarRawConfig)
      : { content: config };

    if (!(current.content instanceof Promise)) return;

    const cancel = new Promise((_, reject) =>
      setCancel((current) => {
        current?.();
        return reject;
      })
    );

    Promise.race([current.content, cancel])
      .then((content) => setConfig({ ...current, content }))
      .catch(() => undefined);
  }, [config]);

  useEffect(() => {
    if (!config) return;

    const { content, duration } = (config as SnackBarRawConfig).content
      ? (config as SnackBarRawConfig)
      : { content: config, duration: undefined };

    if (content instanceof Promise) return;

    setCancel((current) => {
      current?.();
      return undefined;
    });

    if (!content || !duration) return;

    const id = setTimeout(() => dispatch({ type: 'deactivate' }), duration);
    return () => clearTimeout(id);
  }, [config]);

  const setConfig = useCallback((value) => {
    const update =
      typeof value === 'function' ? value(configRef.current) : value;

    if (configRef.current && !update) {
      dispatch({ type: 'deactivate' });
    } else {
      dispatch({ type: 'set', config: update });
    }
  }, []);

  return {
    active,
    config,
    setConfig,
  };
}

export function useSnackBarState(): SnackBarState {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new ContextError('SnackBar');
  }

  const { active, config } = context;

  return {
    active,
    content: (config as SnackBarRawConfig | undefined)?.content
      ? (config as SnackBarRawConfig).content
      : config,
  };
}

export function useSnackBar(): [
  SnackBarConfig,
  Dispatch<SetStateAction<SnackBarConfig>>
] {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new ContextError('SnackBar');
  }

  const { config, setConfig } = context;
  return [config, setConfig];
}
