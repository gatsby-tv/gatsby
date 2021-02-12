import {
  createContext,
  Reducer,
  ReducerState,
  ReducerAction,
  Dispatch,
} from "react";

export interface GlobalState {}

export interface GlobalAction {}

type GlobalReducer = Reducer<GlobalState, GlobalAction>;

export type GlobalContextType = [
  ReducerState<GlobalReducer>,
  Dispatch<ReducerAction<GlobalReducer>>
];

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
