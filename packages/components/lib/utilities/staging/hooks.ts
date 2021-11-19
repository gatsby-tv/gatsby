import { useContext, useReducer, useEffect, useCallback } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { StagingContext, StagingContextType } from './context';

export type StagingState = {
  current: number;
  previous: number;
  disabled: boolean;
};

export type StagingAction =
  | { type: 'jump'; stage: number }
  | { type: 'sync'; stage: number };

export function useStagingContext(stage: number): StagingContextType {
  const [state, dispatch] = useReducer(
    (state: StagingState, action: StagingAction) => {
      switch (action.type) {
        case 'jump':
          return state.disabled || state.current === action.stage
            ? state
            : {
                ...state,
                current: action.stage,
                previous: state.current,
                disabled: true,
              };

        case 'sync':
          return state.current === action.stage
            ? { ...state, disabled: false }
            : { ...state, current: action.stage, previous: state.current };
      }
    },
    {
      current: stage,
      previous: stage,
      disabled: false,
    }
  );

  const sync = useCallback(() => dispatch({ type: 'sync', stage }), [stage]);

  useEffect(() => dispatch({ type: 'jump', stage }), [stage]);

  return { ...state, sync };
}

export function useStage(): StagingContextType {
  const context = useContext(StagingContext);

  if (!context) {
    throw new ContextError('Staging');
  }

  return context;
}
