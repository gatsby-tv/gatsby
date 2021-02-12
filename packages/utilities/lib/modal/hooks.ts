/* eslint-disable react-hooks/exhaustive-deps */

import {
  useContext,
  useState,
  useEffect,
  useCallback,
  DependencyList,
} from "react";

import { ModalContext } from "./context";

export interface ModalCallback {
  (event: any): void;
}

export interface ModalType {
  active: boolean;
  activate: () => void;
  deactivate: () => void;
}

export function useModalCallback(
  callback: ModalCallback,
  deps: DependencyList
): void {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("No Modal context provided for component.");
  }

  const [addModalCallback, removeModalCallback] = context;

  const _callback = useCallback(callback, deps);

  useEffect(() => {
    addModalCallback(_callback);
    return () => removeModalCallback(_callback);
  }, [addModalCallback, _callback]);
}

export function useModal(): ModalType {
  const [active, setActive] = useState(false);
  const activate = useCallback(() => setActive(true), []);
  const deactivate = useCallback(() => setActive(false), []);

  return { active, activate, deactivate };
}
